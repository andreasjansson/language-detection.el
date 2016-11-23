(require 'cl-lib)

(defmacro count-messages (&rest body)
  `(let* ((counter (make-hash-table :test 'equal))
          (increment-counter
           (lambda (&rest key)
             (puthash key (1+ (gethash key counter 0)) counter))))
     (advice-add 'message :before increment-counter)
     ,@body
     (advice-remove 'message increment-counter)
     counter))

(defun website-language-count (url language)
  (gethash (list (format "%s" language)) (count-messages
                                          (eww url)
                                          (sit-for 10)
                                          (kill-buffer))
           0))

(ert-deftest test-website-lisp ()
  (should (>= (website-language-count
               "https://www.gnu.org/s/emacs/manual/html_node/elisp/Output-Functions.html" 'emacslisp)
              3)))

(ert-deftest test-website-python ()
  (should (>= (website-language-count
               "https://docs.python.org/2/library/unittest.html" 'python)
              25)))

(ert-deftest test-string-lisp ()
  (should (equal
           (language-detection-string "(defun hello () world)")
           'lisp)))

(ert-deftest test-string-php ()
  (should (equal
           (language-detection-string "<?php $a = 123; echo $a; ?>' '^php$")
           'php)))

(defconst test-data-dir "/tmp/test-data/linguist")

(defun correct-language (filename dir)
  (with-temp-buffer
   (insert-file-contents (concat test-data-dir "/" dir "/" filename))
   (if (equal (format "%s" (language-detection-buffer)) dir)
       1.0
     0.0)))

(defun average (args)
  (/ (cl-reduce '+ results) (float (length results))))

(ert-deftest test-statistics ()
  (let ((accuracy (cl-loop for dir in (directory-files test-data-dir nil ".[a-z]")
                           nconc (cl-loop for filename in (directory-files (concat test-data-dir "/" dir) nil ".[a-z]")
                                          unless (equal filename "filenames")
                                          collect (correct-language filename dir)) into results
                           finally (return (average results)))))
    (should (> accuracy 0.85))))

(ert-run-tests-batch t)
