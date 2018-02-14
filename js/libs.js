"use strict";
/**
 * Container constructor for Base elements
 * @param {String} containerElem name of HTML Element
 * @param {String} containerClassName Class Name of HTML Element
 * @param {String} containerId Id of HTML Element
 */
function Container(containerElem, containerClassName, containerId) {

    this.elem = containerElem || 'div';
    if (containerId) this.id = containerId;
    if (containerClassName) this.className = containerClassName;
}

Container.prototype.render = function () {
    var containerElem = document.createElement(this.elem);
    if (this.id) containerElem.id = this.id;
    if (this.className) containerElem.classList.add(this.className);

    return containerElem;
};

Container.prototype.remove = function () {
    var elem;
    if (this.id) {
        elem = document.getElementById(this.id);
        elem.ParentNode.removeChild(elem);
        return true;
    } else if (this.className) {
        elem = document.querySelector("." + this.className);
        elem.ParentNode.removeChild(elem);
        return true;
    }
    console.log('For remove element must have id or class name');
    return false;
};

/**
 * Constructor for Gallery elements
 * @param {String} itemElem name of HTML Element
 * @param {String} itemClass Class Name of HTML Element
 * @param {String} galleryId ID of HTML Element
 * @param {any} galleryItems Objects collection of Gallery Items
 */
function Gallery(galleryElem, galleryClass, galleryId, galleryItems) {
    Container.call(this, galleryElem, galleryClass, galleryId);

    this.items = galleryItems;
}

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function () {
    var elemName = this.elem || 'div';
    var elem = document.createElement(elemName);

    if (this.className) elem.classList.add(this.className);
    if (this.id) elem.id = this.id;

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i] instanceof GalleryItem) {
            elem.appendChild(this.items[i].render());
        }
    }

    return elem;
};
/**
 * GalleryItem constructor
 * 
 * @param {String} itemElem name of HTML Element
 * @param {String} itemClass Class Name of HTML Element
 * @param {String} itemData Data name in HTML Element
 * @param {any} itemHref Link in HTML Element
 * @param {any} itemHrefLabel Label of link
 */
function GalleryItem(itemElem, itemClass, itemData, itemHref, itemSrc, itemName) {
    Container.call(this, itemElem, itemClass);

    this.data = itemData || 'menu-item'; // data-item = itemData || 'menu-item'
    this.href = itemHref || '#';
    this.src = itemSrc;
    this.text = itemName;
}

GalleryItem.prototype = Object.create(Container.prototype);
GalleryItem.prototype.constructor = GalleryItem;

GalleryItem.prototype.render = function () {
    var elemName = this.elem || 'a';
    var elem = document.createElement(elemName); // 'a'
    elem.classList.add(this.className);
    elem.dataset.item = this.data || 'image-item';
    elem.href = this.href;

    var img = document.createElement('img');
    img.src = this.src;
    img.alt = 'image';

    elem.appendChild(img);

    var div = document.createElement('div');
    div.textContent = this.text;
    elem.appendChild(div);

    return elem;
};