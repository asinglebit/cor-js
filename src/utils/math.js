'use strict';

/**
 * Convert degrees to radians
 */

export function deg_to_rad(degrees) {

    if (degrees > 0 && degrees % 360 === 0) {
        return trim_float(Math.PI * 2);
    }
    return trim_float(degrees % 360 * (Math.PI / 180));
}

/**
 * Convert degrees to radians
 */

export function rad_to_deg(radians) {
    let negative = radians < 0;
    if (negative) {
        return (Math.floor((radians * (180 / Math.PI))) % 360);
    }
    return trim_float(Math.ceil((radians * (180 / Math.PI))) % 360);
}

/**
 * Trim floats to certain precision
 */

export function trim_float(float, digits = 5) {
    const trimmer = Math.pow(10, digits);
    return Math.round(float * trimmer) / trimmer;
}

/**
 * Trim angles
 */

export function trim_angle(angle) {
    if (angle > 360) {
        return angle % 360;
    } else {
        if (angle < 0) {
            return 360 + angle % 360;
        } else {
            return angle;
        }
    }
}