import matplotlib.pyplot as plt
from bidict import bidict
from StringIO import StringIO
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from sklearn.ensemble import RandomForestClassifier
from sklearn.cross_validation import cross_val_score
from sklearn.grid_search import RandomizedSearchCV
from sklearn.metrics import confusion_matrix
import os
from collections import defaultdict, Counter
import re
import numpy as np

FOLDER_STRUCTURES = {
    'Advent-Of-Code-Polyglot': '*/<language>',
    'ProgrammingLanguage-Detection': 'sources/<language>',
    'RosettaCodeData': 'Task/*/<language>',
    'langolier': 'resources/<language>',
    'linguist': 'samples/<language>',
    'polyglot': 'corpus/<language>',
    'Languages': '<language>',
}

LANGUAGE_ALIASES = {
    'java': 'java',
    'c': 'c',
    'c++': 'cpp',
    'cpp': 'cpp',
    'c#': 'csharp',
    'csharp': 'csharp',
    'c-sharp': 'csharp',
    'python': 'python',
    'py': 'python',
    'visualbasic': 'visualbasic',
    'visual basic': 'visualbasic',
    'visual-basic': 'visualbasic',
    'visual-basic-.net': 'visualbasic',
    'vb': 'visualbasic',
    'php': 'php',
    'javascript': 'javascript',
    'js': 'javascript',
    'perl': 'perl',
    'objc': 'objc',
    'objective c': 'objc',
    'objective-c': 'objc',
    'swift': 'swift',
    'go': 'go',
    'golang': 'go',
    'ruby': 'ruby',
    'rb': 'ruby',
    'matlab': 'matlab',
    'delphi': 'delphi',
    'groovy': 'groovy',
    'r': 'r',
    'sql': 'sql',
    'mssql': 'sql',
    'ms-sql': 'sql',
    'mysql': 'sql',
    'plsql': 'sql',
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
    'css': 'css',
    'latex': 'latex',
    'tex': 'latex',
}

# to avoid binaries etc.
EXTENSIONS = {
    'java': ['java'],
    'c': ['c', 'h'],
    'cpp': ['cpp', 'c++', 'h'],
    'csharp': ['cs'],
    'python': ['py', 'pyx'],
    'visualbasic': ['vb', 'visual'],
    'php': ['php'],
    'javascript': ['js'],
    'perl': ['pl', 'perl'],
    'objc': ['m'],
    'swift': ['swift'],
    'go': ['go'],
    'ruby': ['rb'],
    'matlab': ['matlab', 'm'],
    'delphi': ['delphi'],
    'groovy': ['groovy'],
    'r': ['r'],
    'sql': ['sql'],
    'scala': ['scala'],
    'shell': ['shell', 'sh'],
    'lisp': ['lisp', 'ss', 'newlisp', 'l'],
    'emacslisp': ['el'],
    'erlang': ['erl'],
    'rust': ['rust'],
    'fsharp': ['fs'],
    'clojure': ['clj'],
    'haskell': ['hs'],
    'json': ['json'],
    'html': ['html', 'xhtml', 'htm'],
    'xml': ['xml'],
    'css': ['css'],
    'latex': ['latex', 'tex'],
}

def files_by_language():
    languages_to_lines = defaultdict(list)
    files_per_dataset = defaultdict(int)
    missing = Counter()

    for folder, structure in FOLDER_STRUCTURES.items():
        re_pattern = re.compile(('^data/%s/' % folder) +
                                structure.replace('<language>', '(?P<language>[^/]+)')
                                .replace('**', '.+')
                                .replace('*', '[^/]+')
                                + '($|/)')

        for root, _, files in os.walk("data/%s" % folder):
            match = re_pattern.match(root)
            if match:
                language = match.group('language').lower()
                if language not in LANGUAGE_ALIASES:
                    continue

                language_alias = LANGUAGE_ALIASES[language]

                extensions = frozenset(EXTENSIONS[language_alias])
                for filename in files:
                    extension = filename.split('.')[-1]
                    path = os.path.join(root, filename)
                    if extension in extensions:
                        with open(path) as f:
                            code = [l.rstrip() for l in f.readlines()]
                            languages_to_lines[language_alias] += code
                        files_per_dataset[folder] += 1
                    else:
                        missing.update([(extension, language_alias)])

        print folder, files_per_dataset[folder]

    return languages_to_lines, missing

def make_snippets(languages_to_lines, n_per_language=1000,
                  min_rows=5, max_rows=100):
    snippets = defaultdict(list)
    for language, lines in languages_to_lines.iteritems():
        for _ in range(n_per_language):
            length = np.random.randint(min_rows, max_rows + 1)
            start = np.random.randint(len(lines) - length)
            end = start + length
            snippet = '\n'.join(lines[start:end])
            snippets[language].append(snippet)

    return snippets

def tokenize_snippets(language_snippets, tokens_per_language=200):
    language_tokens = defaultdict(list)
    top_tokens_per_language = defaultdict(Counter)
    regex = re.compile(r'([a-zA-Z0-9_]+|[^ a-zA-Z0-9_\n\t]+)')
    for language, snippets in language_snippets.iteritems():
        for snippet in snippets:
            tokens = regex.findall(snippet)
            counter = Counter(tokens)
            num_tokens = float(len(tokens))
            frequencies = {t: n / num_tokens for t, n in counter.items()}
            language_tokens[language].append(frequencies)
            top_tokens_per_language[language].update(tokens)

    top_tokens = frozenset([
        t for language in language_tokens for t, _ in
        top_tokens_per_language[language].most_common(tokens_per_language)
    ]) - frozenset([
        'julia' # julia-ess.el is in the training set...
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

    features = []
    labels = []

    for language, snippets in language_tokens.iteritems():
        for snippet in snippets:
            vector = np.zeros(len(all_tokens))
            for token, frequency in snippet.items():
                vector[token_index[token]] = frequency
            features.append(vector)
            labels.append(language_index[language])

    shuf = np.random.permutation(len(features))

    return (np.array(features)[shuf], np.array(labels)[shuf],
            token_index, language_index)

def get_classifier():
    # parameters found with random grid search
    return RandomForestClassifier(
        n_estimators=7,
        criterion='gini',
        min_samples_split=2,
        max_depth=150,
        min_samples_leaf=3,
        max_leaf_nodes=1000,
    )

def train_classifier(features, labels):
    clf = get_classifier()
    score = np.mean(cross_val_score(clf, features, labels, n_jobs=4))
    return clf.fit(features, labels), score

def decision_tree_to_lisp(clf, node_id, token_index, language_index):
    left_child = clf.tree_.children_left[node_id]
    right_child = clf.tree_.children_right[node_id]
    if left_child == right_child:
        list_left = list_right = token = 'nil'
        value = language_index.inv[np.argmax(clf.tree_.value[node_id][0])]
    else:
        list_left = decision_tree_to_lisp(clf, left_child, token_index, language_index)
        list_right = decision_tree_to_lisp(clf, right_child, token_index, language_index)
        token = '"%s"' % token_index.inv[clf.tree_.feature[node_id]].replace('\\', r'\\').replace('"', r'\"')
        value = 'nil'

    return '(%s %.6g %s %s %s)' % (
        token,
        clf.tree_.threshold[node_id],
        list_left,
        list_right,
        value)

def hyperparameter_search(features, labels, n_iter=200):
    param_dist = {
        "criterion": ["gini", "entropy"],
        "min_samples_split": [2, 5, 10, 50],
        "max_depth": [25, 50, 75, 100, 150, 200],
        "min_samples_leaf": [1, 10, 50, 100],
        "max_leaf_nodes": [100, 200, 500, 1000, None],
    }

    clf = DecisionTreeClassifier()

    random_search = RandomizedSearchCV(
        clf,
        param_distributions=param_dist,
        n_iter=n_iter,
        verbose=5,
        n_jobs=8)

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

def write_confusion_matrix(features, labels, language_index):
    clf = get_classifier()
    half = len(features) / 2
    clf.fit(features[:half], labels[:half])
    cm = confusion_matrix(labels[half:], clf.predict(features[half:]))
    plt.matshow(cm)
    plt.xticks(range(len(language_index)), sorted(language_index), rotation='vertical')
    plt.yticks(range(len(language_index)), sorted(language_index))
    plt.tick_params(labelbottom=True, labelright=True)
    plt.savefig('assets/confusion-matrix.png', transparent=True,
                bbox_inches='tight', pad_inches=0)

def write_elisp(clf, token_index, language_index, score):
    with open('tree.el', 'w') as f:
        f.write(';; Accuracy: %.2f%%\n' % (score * 100))
        sexps = [decision_tree_to_lisp(dt, 0, token_index, language_index)
                 for dt in clf.estimators_]
        f.write('(defconst language-detection-decision-trees \'(%s))\n' %
                ' '.join(sexps))

def main():
    languages_to_lines = files_by_language()
    snippets = make_snippets(languages_to_lines)
    language_tokens = tokenize_snippets(snippets)
    features, labels, token_index, language_index = create_dataset(language_tokens)
    clf, score = train_classifier(features, labels)

    write_elisp(clf, token_index, language_index, score)
    write_confusion_matrix(features, labels, language_index)
    write_dot_trees(clf, token_index, language_index)

if __name__ == '__main__':
    main()
