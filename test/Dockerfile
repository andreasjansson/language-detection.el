FROM    ubuntu:16.04

RUN     apt-get update
RUN     apt-get install -y software-properties-common
RUN     add-apt-repository ppa:ubuntu-elisp/ppa
RUN     apt-get update
RUN     apt-get install -y emacs-snapshot wget

WORKDIR /root

RUN     mkdir .emacs.d
RUN     wget -O .emacs.d/language-detection.el https://raw.githubusercontent.com/andreasjansson/language-detection.el/master/language-detection.el
ADD     init.el .emacs.d/init.el

ADD     test-script.sh .
RUN     chmod +x test-script.sh

CMD     ./test-script.sh
