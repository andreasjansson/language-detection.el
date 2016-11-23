#!/bin/bash

emacs --batch --load language-detection.el --load eww-syntax-highlighting.el --load test.el 2>&1 | tee test.output

grep -q "Ran 5 tests, 5 results as expected" test.output
