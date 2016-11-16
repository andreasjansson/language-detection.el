# Testing language-detection.el

* Build a new emacs-snapshot in a Docker container and install language-detection.el from Github.
* Add the EWW syntax highlighting hack
* Assert that EWW syntax highlighting works
* Assert that string detection works for a couple languages

```shell
docker build --tag language-detection-test .
docker run language-detection-test
```

All output lines should read `Test passed`
