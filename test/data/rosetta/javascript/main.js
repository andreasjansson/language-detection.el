'use strict';

HTMLElement.prototype.hasClass = function(className) {
    var pattern = new RegExp('\\b' + className + '\\b');

    return pattern.test(this.className);
};

NodeList.prototype.each = function(callback) {
    for (var i = 0, numberOfElements = this.length; i < numberOfElements; i++) {
        callback(this[i]);
    }
};

(function() {
    var videoElement = document.querySelector('video');
    var screenCast = new ScreenCast(videoElement);

    screenCast.start();

    var effectButtons = document.querySelectorAll('ul.effects li a');
    for (var i = 0, numberOfButtons = effectButtons.length; i < numberOfButtons; i++) {
        effectButtons[i].addEventListener('click', function(e) {
            e.preventDefault();

            var effect = this.getAttribute('data-effect');

            if (this.hasClass('active')) {
                this.classList.remove('active');
                videoElement.classList.remove(effect);
            } else {
                document.querySelectorAll('ul.effects li a').each(function(element) {
                    element.classList.remove('active');
                });

                videoElement.setAttribute('class', '');

                this.classList.add('active');
                videoElement.classList.add(effect);
            }
        });
    }
}());