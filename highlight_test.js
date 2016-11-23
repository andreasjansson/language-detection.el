var path = require('path');
var hljs = require('highlight.js');
var fs = require('fs');

var dir = 'test/data/linguist';
var languageSubset = [
    'ada',
    'awk',
    'clojure',
    'cpp',
    'cs',
    'css',
    'dart',
    'delphi',
    'erlang',
    'fortran',
    'fsharp',
    'go',
    'groovy',
    'haskell',
    'html',
    'java',
    'javascript',
    'json',
    'latex',
    'lisp',
    'lua',
    'matlab',
    'objectivec',
    'perl',
    'php',
    'prolog',
    'python',
    'r',
    'ruby',
    'rust',
    'scala',
    'bash',
    'smalltalk',
    'sql',
    'swift',
    'vbscript',
    'vbscript-html',
    'vbnet',
    'xml',
];
var languageAliases = {
    cs: 'csharp',
    objectivec: 'objc',
    bash: 'shell',
    vbscript: 'visualbasic',
    'vbscript-html': 'visualbasic',
    vbnet: 'visualbasic',
}
var inverseLanguageAliases = {
    csharp: 'cs',
    objc: 'objectivec',
    shell: 'bash',
    visualbasic: 'vbscript',
}

function langOrAlias(lang) {
    if (lang in languageAliases) {
        return languageAliases[lang];
    } else {
        return lang;
    }
}

var firstCorrect = 0;
var firstOrSecondCorrect = 0;
var total = 0;
fs.readdir(dir, function(err, langs) {
    langs.forEach(function(lang) {
        if (languageSubset.indexOf(lang) == -1 || (lang in inverseLanguageAliases && languageSubset.indexOf(inverseLanguageAliases[lang]) == -1)) {
            return;
        }
        fs.readdir(path.join(dir, lang), function(err, files) {
            files.forEach(function(file) {
                fs.readFile(path.join(dir, lang, file), {encoding: 'utf-8'}, function(err, data) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    var h = hljs.highlightAuto(data, languageSubset);
                    var first = langOrAlias(h.language);
                    var second = h.second_best && langOrAlias(h.second_best.language);
                    firstCorrect += (lang == first);
                    firstOrSecondCorrect += (lang == first || lang == second);
                    total += 1;
                    console.log(lang, first, second, Math.round(100 * firstCorrect / total), Math.round(100 * firstOrSecondCorrect / total));
                });
            });
        });
    });
});
