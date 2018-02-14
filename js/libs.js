"use strict";
/**
 * Container constructor for Base elements
 * @param {String} containerElem 
 * @param {String} containerClassName
 * @param {String} containerId
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

function Gallery(itemElem, itemClass, itemData, itemHref, itemHrefLabel) {
    Container.call(this, itemElem, itemClass);

    this.data = itemData || 'image-item'; // data-item = itemData || 'image-item'
    this.href = itemHref || '#';
    this.label = itemHrefLabel || '';
}

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function () {
    var elem = document.createElement(this.elem);
    elem.classList.add(this.className);
    elem.dataset.item = this.data || '';

    var a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.label;

    elem.appendChild(a);

    return elem;
};