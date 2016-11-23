from scipy.sparse import csr_matrix, lil_matrix
from glob import glob
import cPickle
from bidict import bidict
from StringIO import StringIO
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.cross_validation import cross_val_score
from sklearn.grid_search import RandomizedSearchCV
from sklearn.metrics import confusion_matrix
import os
from collections import defaultdict, Counter
import re
import numpy as np

# TODO:
#   * download stackoverflow dump from archive.org
#   * use code samples in questions as ground truth if one
#     and only one language is in the tags
#   * https://archive.org/details/stackexchange

LANGUAGE_ALIASES = {
    'java': 'java',
    'swing': 'java',
    'spring': 'java',
    'c': 'c',
    'c++': 'cpp',
    'cpp': 'cpp',
    'c#': 'csharp',
    'csharp': 'csharp',
    'c-sharp': 'csharp',
    'python': 'python',
    'python-2.7': 'python',
    'py': 'python',
    'django': 'python',
    'django/jinja': 'python',
    'numpy': 'python',
    'visualbasic': 'visualbasic',
    'visual basic': 'visualbasic',
    'visual-basic': 'visualbasic',
    'visual-basic-.net': 'visualbasic',
    'vb': 'visualbasic',
    'vb.net': 'visualbasic',
    'php': 'php',
    'javascript+php': 'php',
    'laravel': 'php',
    'symfony2': 'php',
    'javascript': 'javascript',
    'node.js': 'javascript',
    'jquery': 'javascript',
    'js': 'javascript',
    'angularjs': 'javascript',
    'perl': 'perl',
    'perl6': 'perl',
    'objc': 'objc',
    'objective c': 'objc',
    'objective-c': 'objc',
    'swift': 'swift',
    'go': 'go',
    'golang': 'go',
    'ruby': 'ruby',
    'rb': 'ruby',
    'ruby-on-rails': 'ruby',
    'ruby-on-rails-3': 'ruby',
    'matlab': 'matlab',
    'octave': 'matlab',
    'delphi': 'delphi',
    'groovy': 'groovy',
    'r': 'r',
    's': 'r',
    'sql': 'sql',
    'sqlite': 'sql',
    'sql-server': 'sql',
    'mssql': 'sql',
    'ms-sql': 'sql',
    'mysql': 'sql',
    'plsql': 'sql',
    'postgresql': 'sql',
    'scala': 'scala',
    'shell': 'shell',
    'bash': 'shell',
    'unix-shell': 'shell',
    'sh': 'shell',
    'lisp': 'lisp',
    'common lisp': 'lisp',
    'commonlisp': 'lisp',
    'scheme': 'lisp',
    'newlisp': 'lisp',
    'elisp': 'emacslisp',
    'emacs lisp': 'emacslisp',
    'emacs-lisp': 'emacslisp',
    'erlang': 'erlang',
    'rust': 'rust',
    'dart': 'dart',
    'f#': 'fsharp',
    'fsharp': 'fsharp',
    'f-sharp': 'fsharp',
    'clojure': 'clojure',
    'clj': 'clojure',
    'haskell': 'haskell',
    'json': 'json',
    'html': 'html',
    'xhtml': 'html',
    'html5': 'html',
    'xml': 'xml',
    'xml+django/jinja': 'xml',
    'xml+ruby': 'xml',
    'xml+php': 'xml',
    'css': 'css',
    'css+lasso': 'css',
    'css3': 'css',
    'latex': 'latex',
    'tex': 'latex',
    'lua': 'lua',
    'fortran': 'fortran',
    'prolog': 'prolog',
    'smalltalk': 'smalltalk',
    'ada': 'ada',
    'awk': 'awk',
}

LANGUAGES = frozenset(LANGUAGE_ALIASES.values())
DATA_FOLDER = 'data/stackoverflow'

def snippets_per_language(num_per_language=10000):
    ret = defaultdict(list)

    for folder in os.listdir(DATA_FOLDER):
        if folder not in LANGUAGES:
            continue
        filenames = os.listdir(os.path.join(DATA_FOLDER, folder))
        if len(filenames) > num_per_language:
            filenames = np.random.choice(
                filenames, num_per_language, replace=False)

        for i, filename in enumerate(filenames):
            if i % 1000 == 0:
                print folder, i

            with open(os.path.join(DATA_FOLDER, folder, filename)) as f:
                ret[folder].append(f.read())
    return ret

token_regex = re.compile(r'([a-zA-Z0-9_]+|[^ a-zA-Z0-9_\n\t]+)')

def tokenize_string(s):
    singles = token_regex.findall(s)
    pairs = ['%s %s' % (singles[i], singles[i + 1])
             for i in range(len(singles) - 1)]
    return singles + pairs

def get_token_frequencies(tokens):
    counter = Counter(tokens)
    num_tokens = float(len(tokens))
    return {t: n / num_tokens for t, n in counter.items()}

def tokenize_snippets(language_snippets, tokens_per_language=500):
    language_tokens = defaultdict(list)
    top_tokens_per_language = defaultdict(Counter)
    for language, snippets in language_snippets.iteritems():
        for snippet in snippets:
            tokens = tokenize_string(snippet)
            frequencies = get_token_frequencies(tokens)
            language_tokens[language].append(frequencies)
            top_tokens_per_language[language].update(tokens)

    top_tokens = frozenset([
        t for language in language_tokens for t, _ in
        top_tokens_per_language[language].most_common(tokens_per_language)
    ])

    pruned_language_tokens = defaultdict(list)
    for language, token_frequencies in language_tokens.iteritems():
        for frequencies in token_frequencies:
            pruned = {t: f for t, f in frequencies.items()
                      if t in top_tokens}
            pruned_language_tokens[language].append(pruned)

    return pruned_language_tokens

def create_dataset(language_tokens):
    all_tokens = sorted(set([t for _, snippets in language_tokens.iteritems()
                             for snippet in snippets
                             for t, _ in snippet.items()]))

    print len(all_tokens)

    token_index = bidict({t: i for i, t in enumerate(all_tokens)})

    language_index = bidict({lang: i for i, lang in enumerate(sorted(language_tokens))})

    num_snippets = np.sum([len(s) for s in language_tokens.itervalues()])
    features = lil_matrix((num_snippets, len(all_tokens)), dtype=np.float32)
    labels = np.zeros(num_snippets, dtype=np.float32)

    i = 0
    for language, snippets in language_tokens.iteritems():
        for snippet in snippets:
            for token, frequency in snippet.items():
                features[i, token_index[token]] = frequency
            labels[i] = language_index[language]
            i += 1

            if i % 10000 == 0:
                print '%.2f%%' % (100 * (i + 1) / float(num_snippets))

    return (features.tocsr(), labels, token_index, language_index)

def get_classifier(n_jobs=1):
    # parameters found with random grid search
    return RandomForestClassifier(
        n_estimators=11,
        criterion='gini',
        min_samples_split=2,
        max_depth=100,
        min_samples_leaf=5,
        max_leaf_nodes=None,
        n_jobs=n_jobs,
    )

def train_classifier(features, labels):
    clf = get_classifier(n_jobs=4)
    score = np.mean(cross_val_score(clf, features, labels, n_jobs=4))
    return clf.fit(features, labels), score

def hyperparameter_search(features, labels, n_iter=200, n_jobs=8):
    param_dist = {
        "max_features": ['log2', 'sqrt'],
        "n_estimators": [7, 11, 15, 22, 30, 45, 60],
        "criterion": ["gini"],
        "min_samples_split": [2, 5, 10, 20],
        "max_depth": [50, 70, 100, 120, 150, 180, 200, 150, 300, 400],
        "min_samples_leaf": [3, 5, 10, 15],
        "max_leaf_nodes": [100, 300, 500, 800, 1000, None],
    }

    clf = RandomForestClassifier()

    random_search = RandomizedSearchCV(
        clf,
        param_distributions=param_dist,
        n_iter=n_iter,
        verbose=5,
        n_jobs=n_jobs)

    random_search.fit(features, labels)

    return random_search

def write_dot_tree(clf, token_index, language_index, name):
    def dot_clean(s):
        return s.replace('\\', r'\\').replace('"', r'\"').replace('$', r'\$')

    feature_names = [dot_clean(s) for s in sorted(token_index)]
    class_names = [dot_clean(s) for s in sorted(language_index)]

    out = StringIO()
    export_graphviz(clf, out, feature_names=feature_names,
                    class_names=class_names, impurity=False)

    processed = re.sub(r'\\nvalue = \[[^]]+\]', '', out.getvalue())
    with open('assets/%s.dot' % name, 'w') as f:
        f.write(processed)
    os.system('dot assets/%s.dot -o assets/%s.pdf -Tpdf' % (name, name))

def write_dot_trees(clf, token_index, language_index):
    for i, decision_tree in enumerate(clf.estimators_):
        write_dot_tree(decision_tree, token_index, language_index,
                       'tree-%d' % i)

def write_confusion_matrix(features, labels, language_index, clf=None):
    import matplotlib
    matplotlib.use('PS')
    import matplotlib.pyplot as plt
    plt.ioff()

    half = len(labels) / 2
    ndx = np.arange(len(labels))
    np.random.shuffle(ndx)
    train_ndx = ndx[:half]
    test_ndx = ndx[half:]
    if clf is None:
        clf = get_classifier()
        clf.fit(features[train_ndx], labels[train_ndx])
    cm = confusion_matrix(labels[test_ndx], clf.predict(features[test_ndx]))

    plt.matshow(cm)
    plt.xticks(range(len(language_index)), sorted(language_index), rotation='vertical')
    plt.yticks(range(len(language_index)), sorted(language_index))
    plt.tick_params(labelbottom=True, labelright=True)
    plt.savefig('assets/confusion-matrix.png', transparent=True,
                bbox_inches='tight', pad_inches=0)

def write_elisp(clf, token_index, language_index,
                filename='language-detection.el',
                begin_string=';; BEGIN AUTO-GENERATED CODE',
                end_string=';; END AUTO-GENERATED CODE'):
    lines = []
    lines.append(elisp_token_index(token_index))
    lines.append(elisp_language_index(language_index))
    with open('tree.el', 'w') as f:
        sexps = [decision_tree_to_lisp(dt, 0, token_index, language_index)
                 for dt in clf.estimators_]
        lines.append(elisp_defconst('language-detection-forest', "'(%s)" % ' '.join(sexps)))

    with open(filename) as f:
        code = f.read()
        before = code.split(begin_string)[0]
        after = code.split(end_string)[-1]

    with open(filename, 'w') as f:
        f.write(before)
        f.write(begin_string)
        f.write('\n\n%s\n\n' % '\n'.join(lines))
        f.write(end_string)
        f.write(after)

def elisp_token_index(token_index):
    return elisp_defconst('language-detection-tokens-to-index', elisp_string_to_int_map(token_index))

def elisp_language_index(language_index):
    return elisp_defconst('language-detection-index-to-languages', elisp_map(language_index.inv))

def elisp_defconst(name, value):
    return '(defconst %s %s)' % (name, value)

def elisp_string_to_int_map(d):
    return elisp_map({
        '"%s"' % elisp_escape(k): v
        for k, v in d.iteritems()
    })

def elisp_map(d):
    items = [
        '(%s . %s)' % (k, v)
        for k, v in d.iteritems()
    ]
    return "(language-detection-alist-to-hashmap '(%s))" % ' '.join(items)

def elisp_escape(s):
    return str(s).replace('\\', r'\\').replace('"', r'\"')

def decision_tree_to_lisp(clf, node_id, token_index, language_index):
    left_child = clf.tree_.children_left[node_id]
    right_child = clf.tree_.children_right[node_id]
    if left_child == right_child:
        return '[%s %d]' % (
            np.argmax(clf.tree_.value[node_id][0]),
            100 * np.max(clf.tree_.value[node_id][0]) / np.sum(clf.tree_.value[node_id][0])
        )
    else:
        list_left = decision_tree_to_lisp(clf, left_child, token_index, language_index)
        list_right = decision_tree_to_lisp(clf, right_child, token_index, language_index)
        return '[%s %.3g %s %s]' % (
            clf.tree_.feature[node_id],
            clf.tree_.threshold[node_id] * 1000,
            list_left,
            list_right)

def random_files_by_language(n=100):
    ret = {}
    files_by_language = defaultdict(list)
    for filename, language in iter_files():
        files_by_language[language].append(filename)
    for language, filenames in files_by_language.iteritems():
        ret[language] = set(np.random.choice(filenames, n))
    return ret

def copy_files(files_by_language):
    import shutil

    for language, filenames in files_by_language.iteritems():
        folder = '../language-detection.el/test/data/%s' % language
        if not os.path.exists(folder):
            os.mkdir(folder)
        for filename in filenames:
            shutil.copyfile(filename, folder + '/' + os.path.basename(filename))

def write_classifier(clf):
    from sklearn.externals import joblib
    joblib.dump(clf, 'assets/classifier.pkl', compress=9)

def traverse_decision_tree(clf, node_id, feature):
    left_child = clf.tree_.children_left[node_id]
    right_child = clf.tree_.children_right[node_id]
    threshold  =  clf.tree_.threshold[node_id]
    f = feature[clf.tree_.feature[node_id]]
    if left_child == right_child:
        return np.argmax(clf.tree_.value[node_id][0])
    elif f <= round(threshold, 6):
        return traverse_decision_tree(clf, left_child, feature)
    else:
        return traverse_decision_tree(clf, right_child, feature)

def traverse_decision_tree_tokens(clf, node_id, token_index,
                                  language_index, frequencies):
    left_child = clf.tree_.children_left[node_id]
    right_child = clf.tree_.children_right[node_id]
    threshold  =  clf.tree_.threshold[node_id]
    if left_child == right_child:
        return (language_index.inv[np.argmax(clf.tree_.value[node_id][0])], int(100 * np.max(clf.tree_.value[node_id][0]) / np.sum(clf.tree_.value[node_id])))

    token = token_index.inv[clf.tree_.feature[node_id]]

    if frequencies.get(token, 0) <= round(threshold, 6):
        return traverse_decision_tree_tokens(clf, left_child, token_index, language_index, frequencies)
    else:
        return traverse_decision_tree_tokens(clf, right_child, token_index, language_index, frequencies)

def test_test_set(clf):
    from glob import glob
    from scipy.stats import mode
    correct = []
    for d in glob('test/data/rosetta/*'):
        for f in glob('%s/*' % d):
            if os.path.basename(f) == 'filenames':
                continue

            language = d.split('/')[-1].lower()

            s = open(f).read()
            tokens = tokenize_string(s)
            frequencies = get_token_frequencies(tokens)
            predictions = defaultdict(float)
            for e in clf.estimators_:
                pred, proba = traverse_decision_tree_tokens(
                    e, 0, token_index, language_index, frequencies)
                predictions[pred] += proba
            prediction = sorted(predictions.items(), key=lambda (k, v): -v)[0][0]
            correct.append(prediction == language)
            #print d.split('/')[-1], prediction
    return np.mean(correct)

def test_test_set_fast(clf, test_features=None, test_labels=None, codes=None):
    if test_features is None:
        test_features, test_labels, codes = get_test_set()

    preds = clf.predict(test_features)
    probas = clf.predict_proba(test_features)
    langs = [language_index.inv[i] for i in range(len(language_index))]
    lang_probas = [sorted(zip(p, langs)) for p in probas]
    return np.mean(preds == test_labels), preds, lang_probas, test_features, test_labels, codes

def get_test_set():
    test_features = []
    test_labels = []
    codes = []
    for d in glob('test/data/rosetta/*'):
        for f in glob('%s/*' % d):
            if os.path.basename(f) == 'filenames':
                continue

            language = d.split('/')[-1].lower()

            s = open(f).read()
            codes.append(s)
            tokens = tokenize_string(s)
            frequencies = get_token_frequencies(tokens)
            test_feature = np.zeros(features.shape[1])
            for token, freq in frequencies.items():
                if token in token_index:
                    test_feature[token_index[token]] = freq
            test_features.append(test_feature)
            test_labels.append(language_index[language])
    return csr_matrix(test_features), np.array(test_labels), codes


def save_dataset(features, labels, token_index, language_index):
    np.savez('labels.npz', labels)
    np.savez('features',
             data=features.data,
             indices=features.indices,
             indptr=features.indptr,
             shape=features.shape
    )
    with open('metadata.cpkl', 'w') as f:
        cPickle.dump({'token_index': token_index, 'language_index': language_index}, f, protocol=cPickle.HIGHEST_PROTOCOL)

def load_dataset():
    labels = np.load('labels.npz')['arr_0']
    f = np.load('features.npz')
    features = csr_matrix(
        (f['data'], f['indices'], f['indptr']),
        shape=f['shape'])
    with open('metadata.cpkl') as f:
        metadata = cPickle.load(f)
        token_index = metadata['token_index']
        language_index = metadata['language_index']

    return features, labels, token_index, language_index

def compare_pygments():
    from pygments.lexers import guess_lexer, ClassNotFound

    total = 0
    correct = 0
    bad = defaultdict(int)

    for lang in glob('test/data/linguist/*'):
        for filename in glob('%s/*' % lang):
            if os.path.basename(filename) == 'filenames':
                continue
            with open(filename) as f:
                try:
                    pred = guess_lexer(f.read()).name.lower()
                    if pred in LANGUAGE_ALIASES:
                        pred = LANGUAGE_ALIASES[pred]
                    else:
                        bad[pred] += 1
                    if pred == lang.split('/')[-1]:
                        correct += 1
                except ClassNotFound:
                    pred = 'unknown'
            total += 1

    return correct / float(total), bad


def main():
    snippets = snippets_per_language()
    language_tokens = tokenize_snippets(snippets)
    features, labels, token_index, language_index = create_dataset(language_tokens)
    # save_dataset(features, labels, token_index, language_index)
    # features, labels, token_index, language_index = load_dataset()

    clf, score = train_classifier(features, labels)

    write_elisp(clf, token_index, language_index)
    write_classifier(clf)
    write_confusion_matrix(features, labels, language_index)

if __name__ == '__main__':
    main()
