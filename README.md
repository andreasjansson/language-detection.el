# language-detection.el

Emacs Lisp library that automatically detects the programming language in a buffer or string. Supports 32 languages, with around 94% accuracy.

## Usage

* `M-x language-detection-buffer`
 - Interactive function, outputs the buffer's language to *\*Messages\**

* `(language-detection-string STRING)`
 - Non-interactive function, returns the language of STRING

## Classifier training procedure

The model consists of a Random Forest ensemble of 7 Decision Tree classifiers.

It was trained on a number of corpuses:

 * [Advent-Of-Code-Polyglot](https://github.com/ChrisPenner/Advent-Of-Code-Polyglot
 * [ProgrammingLanguage-Detection](https://github.com/kaushik94/ProgrammingLanguage-Detection
 * [RosettaCodeData](https://github.com/acmeism/RosettaCodeData
 * [langolier](https://github.com/mishadoff/langolier
 * [linguist](https://github.com/github/linguist
 * [polyglot](https://github.com/polyrabbit/polyglot
 * [Languages](https://github.com/Gerst20051/Languages

Number of lines of code per language:

 * c: 419721
 * clojure: 8060
 * cpp: 132972
 * csharp: 9896
 * css: 39426
 * delphi: 8128
 * emacslisp: 948
 * erlang: 12948
 * fsharp: 2340
 * go: 45505
 * groovy: 9149
 * haskell: 22400
 * html: 101109
 * java: 48440
 * javascript: 219667
 * json: 154
 * latex: 172
 * lisp: 8330
 * matlab: 14351
 * objc: 26116
 * perl: 26276
 * php: 354789
 * python: 530642
 * r: 7205
 * ruby: 28461
 * rust: 4291
 * scala: 14568
 * shell: 12414
 * sql: 1969
 * swift: 735
 * visualbasic: 4871
 * xml: 4078

Since the distribution of languges is highly skewed, I created a dataset by concatenating all lines per language and sampling 1000 snippets of 5-100 lines.

I then tokenize the snippets using this simple regex: `([a-zA-Z0-9_]+|[^ a-zA-Z0-9_\n\t]+)` and filter all tokens that are not in the superset of the 200 most common tokens per language.

Finally, the tokens counted for frequency and placed in a 2241-dimensional bag-of-words vector. (2241 is the total number of unique tokens.) For example, this is a bag corresponding to a C snippet:

 * `(`: 0.05371
 * `.`: 0.05115
 * `);`: 0.03581
 * `/**`: 0.03325
 * `void`: 0.03069
 * `*/`: 0.03069
 * `const`: 0.02302
 * `&`: 0.02302
 * `col`: 0.02302
 * `to`: 0.0179
 * `property`: 0.0179
 * `text`: 0.01535
 * `,`: 0.01535
 * `background`: 0.01535
 * `)`: 0.01535
 * `of`: 0.01535
 * `focus`: 0.01279
 * `name`: 0.01279
 * `bool`: 0.01279
 * `{`: 0.01023
 * `not`: 0.01023
 * `id`: 0.01023
 * `-`: 0.01023
 * `inline`: 0.01023
 * `}`: 0.01023
 * `\`: 0.007673
 * `default`: 0.007673
 * `=`: 0.007673

For classification I use a basic sklearn Random Forest. The hyperparameters were found using random grid search. I use an ensemble of 7 decision trees. Cross-validated accuracy of around 94%.

The decision trees are written out as Emacs Lisp sexps in the format `(TOKEN THRESHOLD LEFT_CHILD RIGHT_CHILD VALUE)`. In `language-detection.el` that data structure is traversed recursively until leaves are found in each tree. The most common leaf class is then chosen as the language.
