# language-detection.el

[![MELPA](https://melpa.org/packages/language-detection-badge.svg)](https://melpa.org/#/language-detection) [![Build Status](https://travis-ci.org/andreasjansson/language-detection.el.svg?branch=master)](https://travis-ci.org/andreasjansson/language-detection.el)

Emacs Lisp library that automatically detects the programming language in a buffer or string.

## Usage

* `M-x language-detection-buffer`
 - Interactive function, outputs the buffer's language to _\*Messages\*_
 - When called non-interactively, returns the language

* `(language-detection-string STRING)`
 - Non-interactive function, returns the language of STRING

## Model performance

Language classification accuracy of this model compared to a few existing systems on three different datasets:

<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th><a href="https://archive.org/details/stackexchange">Stack Overflow</a></th>
      <th><a href="https://github.com/acmeism/RosettaCodeData">Rosetta Code</a></th>
      <th><a href="https://github.com/github/linguist/tree/master/samples">Github Linguist</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>language-detection.el</td>
      <td>73%</td>
      <td>84%</td>
      <td>87%</td>
    </tr>
    <tr>
      <td><a href="https://highlightjs.org/">Highlight.js</a></td>
      <td>36%</td>
      <td>54%</td>
      <td>56%</td>
    </tr>
    <tr>
      <td><a href="http://pygments.org/docs/api/#pygments.lexers.guess_lexer">Pygments</a></td>
      <td>10%</td>
      <td>25%</td>
      <td>37%</td>
    </tr>
    <tr>
      <td><a href="https://github.com/chrislo/sourceclassifier">SourceClassifier</a></td>
      <td>51%</td>
      <td>48%</td>
      <td>65%</td>
    </tr>
  </tbody>
</table>

## Computational performance

The actual random forest lookup is fast, the bottleneck is regular expression-based tokenization.

```
Function Name                         Call Count  Elapsed time  Average Time
language-detection-buffer             441         8.0538804580  0.0182627674
language-detection-string             441         8.0525858239  0.0182598318
language-detection-tokenize-string    441         6.2478335339  0.0141674229
language-detection-token-frequencies  441         1.6420298549  0.0037234237
language-detection-forest-lookup      441         0.0973103440  0.0002206583
language-detection-tree-lookup        4851        0.0885046049  1.824...e-05
```

## Supported languages

* ada
* awk
* c
* clojure
* cpp
* csharp
* css
* dart
* delphi
* emacslisp
* erlang
* fortran
* fsharp
* go
* groovy
* haskell
* html
* java
* javascript
* json
* latex
* lisp
* lua
* matlab
* objc
* perl
* php
* prolog
* python
* r
* ruby
* rust
* scala
* shell
* smalltalk
* sql
* swift
* visualbasic
* xml

## EWW syntax highlighting

Write this in your .emacs:

<!--- BEGIN EWW CODE -->
```elisp
(require 'cl-lib)

(defun eww-tag-pre (dom)
  (let ((shr-folding-mode 'none)
        (shr-current-font 'default))
    (shr-ensure-newline)
    (insert (eww-fontify-pre dom))
    (shr-ensure-newline)))

(defun eww-fontify-pre (dom)
  (with-temp-buffer
    (shr-generic dom)
    (let ((mode (eww-buffer-auto-detect-mode)))
      (when mode
        (eww-fontify-buffer mode)))
    (buffer-string)))

(defun eww-fontify-buffer (mode)
  (delay-mode-hooks (funcall mode))
  (font-lock-default-function mode)
  (font-lock-default-fontify-region (point-min)
                                    (point-max)
                                    nil))

(defun eww-buffer-auto-detect-mode ()
  (let* ((map '((ada ada-mode)
                (awk awk-mode)
                (c c-mode)
                (cpp c++-mode)
                (clojure clojure-mode lisp-mode)
                (csharp csharp-mode java-mode)
                (css css-mode)
                (dart dart-mode)
                (delphi delphi-mode)
                (emacslisp emacs-lisp-mode)
                (erlang erlang-mode)
                (fortran fortran-mode)
                (fsharp fsharp-mode)
                (go go-mode)
                (groovy groovy-mode)
                (haskell haskell-mode)
                (html html-mode)
                (java java-mode)
                (javascript javascript-mode)
                (json json-mode javascript-mode)
                (latex latex-mode)
                (lisp lisp-mode)
                (lua lua-mode)
                (matlab matlab-mode octave-mode)
                (objc objc-mode c-mode)
                (perl perl-mode)
                (php php-mode)
                (prolog prolog-mode)
                (python python-mode)
                (r r-mode)
                (ruby ruby-mode)
                (rust rust-mode)
                (scala scala-mode)
                (shell shell-script-mode)
                (smalltalk smalltalk-mode)
                (sql sql-mode)
                (swift swift-mode)
                (visualbasic visual-basic-mode)
                (xml sgml-mode)))
         (language (language-detection-string
                    (buffer-substring-no-properties (point-min) (point-max))))
         (modes (cdr (assoc language map)))
         (mode (cl-loop for mode in modes
                        when (fboundp mode)
                        return mode)))
    (message (format "%s" language))
    (when (fboundp mode)
      mode)))

(setq shr-external-rendering-functions
      '((pre . eww-tag-pre)))
```
<!--- END EWW CODE -->

## Classifier training procedure

The model consists of a Random Forest ensemble of 11 Decision Tree classifiers.

It was trained on code snippets from the [Stack Overflow data dump](https://archive.org/details/stackexchange), extracted from `<pre>` tags. The number of snippets per language was capped at 10,000. The actual training snippets can be unpickled from `snippets.cpkl`.

The snippets were tokenized simple regex: `([a-zA-Z0-9_]+|[^ a-zA-Z0-9_\n\t]+)`. The set of single tokens and pairs of consecutive tokens are pruned to the top 500 token/token pairs per language.

Finally, the tokens are counted for frequency and placed in a 7772-dimensional bag-of-words vector. (7772 is the total number of unique tokens/pairs.) For example, this is a bag corresponding to a short Haskell snippet:

```
"         : 0.057971
(         : 0.0144928
)         : 0.0144928
->        : 0.0289855
-> IO     : 0.0144928
.         : 0.0289855
. h       : 0.0289855
::        : 0.0289855
IO        : 0.0144928
h         : 0.0289855
import    : 0.0289855
```

For classification I use a Random Forest with 11 decision trees. The hyperparameters were found using random grid search. Here's a confusion matrix:

![Confusion matrix](https://github.com/andreasjansson/language-detection.el/raw/master/assets/confusion-matrix.png)

The decision trees are written out as Emacs Lisp arrays and traversed recursively until leaves are found in each tree.
