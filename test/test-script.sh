#!/bin/bash

EMACS="emacs -batch -l ~/.emacs.d/init.el"

function assert_language_appears_in_website {
    url=$1
    language=$2
    min_occurrences=$3

    output=$($EMACS --eval="(progn (eww \"$url\") (sit-for 5))" 2>&1)
    if (($(echo "$output" | grep "$language" | wc -l) > $min_occurrences))
    then
        echo "Test passed"
    else
        echo "Test failed: Language $language didn't appear at least $min_occurrences times in $url"
        echo "$output"
    fi
    assert_not_exceeds_max_specpdl_size "$output"
}

function assert_language_appears_in_string {
    string=$1
    language=$2

    output=$($EMACS --eval="(prin1 (language-detection-string \"$string\"))" 2>&1)
    if $(echo "$output" | grep -q "$language")
    then
        echo "Test passed"
    else
        echo "Test failed: Language $language didn't appear in $string"
        echo "$output"
    fi
    assert_not_exceeds_max_specpdl_size "$output"
}

function assert_not_exceeds_max_specpdl_size {
    output=$1
    if $(echo "$output" | grep -q "Variable binding depth exceeds max-specpdl-size")
    then
        echo "Variable binding depth exceeds max-specpdl-size"
    fi
}

assert_language_appears_in_website 'https://www.gnu.org/s/emacs/manual/html_node/elisp/Output-Functions.html' 'lisp$' 5
assert_language_appears_in_website 'https://docs.python.org/2/library/unittest.html' '^python$' 5

assert_language_appears_in_string '(defun hello () world)' 'lisp$'
assert_language_appears_in_string '<?php $a = 123; echo $a; ?>' '^php$'
