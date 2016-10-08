'use strict';

var glMatrix = require('gl-matrix');
var vec2 = glMatrix.vec2;

import { Selection } from '../core/selection';
import { BBox } from '../core/bbox';
import { inherit } from "../utils/helper";

exports.Path = function(_scene, Primitive) {

    /**
     * Extends the Primitive prototype
     */

    inherit(Path, Primitive);

    /**
     * Path constructor
     */

    function Path() {
        Primitive.call(this);

        /**
         * Starting point used to apply vectors to
         */

        this._at = {
            x: 0,
            y: 0
        };

        /**
         * Segment elements are arrays obeying the following conventions:
         *
         * Linear - consists of one element representing the x and y of
         * the next point
         *
         * Quadratic - consists of two elements, the first one represents
         * the x and y of the next point, the second one represents the
         * control point of a quadratic bezier curve
         *
         * Cubic - consists of three elements, the first one represents
         * the x and y of the next point, the second and the third elements
         * represent the control points of a cubic bezier curve
         */

        this._segments = [];
    };

    /**
     * Get or set the starting point of the path
     */

    Path.prototype.at = function(x, y) {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            this._at.x = x;
            this._at.y = y;
            return this;
        } else {
            return this._at;
        }
    };

    /**
     * Add linear segment
     */

    Path.prototype.linearTo = function(...points) {
        if (points.length === 2) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Add quadratic segment
     */

    Path.prototype.quadraticTo = function(...points) {
        if (points.length === 4) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Add cubic segment
     */

    Path.prototype.cubicTo = function(...points) {
        if (points.length === 6) {
            this._segments.push(points);
        }
        return this;
    };

    /**
     * Get the segments of the path
     */

    Path.prototype.segments = function() {
        return this._segments.slice();
    };

    /**
     * Get the bounding box of the current node only
     */

    Path.prototype.bboxOwn = function() {};

    /**
     * Render the current path
     */

    Path.prototype.render = function() {
        let context = _scene.context();
        let matrix = this._matrix_cascaded;
        context.setTransform(matrix[0], matrix[1], matrix[3], matrix[4], matrix[6], matrix[7]);
        context.beginPath();
        context.moveTo(this._at.x, this._at.y);
        for (let i = 0; i < this._segments.length; ++i) {
          switch (this._segments[i].length) {
            case 2:
              context.lineTo(...this._segments[i]);
              break;
            case 4:
              context.quadraticCurveTo(...this._segments[i]);
              break;
            case 6:
              context.bezierCurveTo(...this._segments[i]);
              break;
            default:
          }
        }
        context.stroke();
    };

    return Path;
};
