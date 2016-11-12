'use strict';

/**
 * Link the child objects prototype to the parent objects prototype
 */

export function inherit(child, parent) {
    for (var property in parent) {
        if (parent.hasOwnProperty(property)) {
            child[property] = parent[property];
        }
    }

    function extend() {
        this.constructor = child;
    }
    extend.prototype = parent.prototype;
    child.prototype = new extend();
};

/**
 * Convert a glmatrix mat3 object to an array
 */

export function matrix_to_array(matrix) {
    var _matrix = [];
    for (let i = 0; i < matrix.length; ++i) {
        _matrix.push(matrix[i]);
    }
    return _matrix;
};

/**
 * Convert a glmatrix mat3 object to an array canvas transformation function accepts
 */

export function glmatrix_to_canvas_matrix(matrix) {
    return [matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]];
}

/**
 * Get a random color
 */

export function random_color() {
    return [
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.random(),
    ];
}

/**
 * Get base prototype
 */

export function get_base_name(object) {
    object = object.__proto__.constructor;
    while (object.prototype.__proto__.constructor.name !== 'Object') {
        object = object.prototype.__proto__.constructor;
    }
    return object.name;
}

/**
 * Decompose color string into components
 */

export function decompose_color(color) {
    color = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
    for (let i = 0; i < color.length; ++i) {
        color[i] = +color[i];
    }
    return color;
}

/**
 * Decompose a text string into an array of unicode character codes
 */

export function decompose_text(text) {
    const characters = [];
    for (let i = 0; i < text.length; ++i) {
        characters.push(text.charCodeAt(i));
    }
    return characters;
}

/**
 * Compose an array of unicode character codes into a text string
 */

export function compose_text(characters) {
    let text = '';
    for (let i = 0; i < characters.length; ++i) {
        text += String.fromCharCode(characters[i]);
    }
    return text;
}
