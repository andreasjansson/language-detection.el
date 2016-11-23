FROM    andreasjansson/docker-emacs-base-image

WORKDIR /root

ADD     data /tmp/test-data

ADD     language-detection.el .
ADD     eww-syntax-highlighting.el .
ADD     test.el .

ADD     test-script.sh .
RUN     chmod +x test-script.sh

CMD     ./test-script.sh
