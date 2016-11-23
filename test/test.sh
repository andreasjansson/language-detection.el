#!/bin/bash

set -eux

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
rm -f $DIR/language-detection.el
cp $DIR/../language-detection.el $DIR/language-detection.el

cat $DIR/../README.md | awk '
/BEGIN EWW CODE/ {
  code = NR
}
/```/ && code > 0 && NR - code > 3 {
  code = 0
}
code > 0 && NR > code + 1 {
  print
}
' > $DIR/eww-syntax-highlighting.el

sudo docker build --tag language-detection-test $DIR
sudo docker run language-detection-test
