'use strict';

(function () {

    function ReadError(message, cause) {
        this.message = message;
        this.cause = cause;
        this.name = 'ReadError';
        this.stack = cause.stack;
    }

    function errorHandler(e) {
        if (e.name == 'URIError') {
            throw new ReadError('Ошибка в URI', e);
        } else if (e.name == 'SyntaxError') {
            throw new ReadError('Синтаксическая ошибка в данных', e);
        } else if (e.name == 'ReadError') {
            alert(e.message);
            alert(e.cause);
        } else {
            throw e;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './json/gallery.json', true);
    xhr.addEventListener('readystatechange', createGallery);
    xhr.addEventListener('error', errorHandler);
    xhr.send();

    function createGallery() {
        if (xhr.readyState !== XMLHttpRequest.DONE) { // 4
            return;
        }

        var results;
        try {
            results = JSON.parse(xhr.responseText);
        } catch (err) {
            errorHandler(err);
            return;
        }

        if (xhr.status < 200 && xhr.status >= 400) {
            errorHandler(xhr.statusText);
        } else if (results.result !== 'success') {
            errorHandler(results);
        }

        var galleryArray = [];
        results.data.forEach(function (item) {
            if ('result' in item) {
                return;
            }
            galleryArray.push(new GalleryItem(
                'a', 'img__item', 'clothes', item.href, item.src, (item.name + item.price + ' р.')).render());
        });

        var gallery = new Gallery('div', 'gallery__item', '', galleryArray).render();
        document.querySelector('.gallery').appendChild(gallery);

    }
})();