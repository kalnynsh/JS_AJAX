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