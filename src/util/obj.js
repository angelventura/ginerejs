/**
 * Some function on objects
 */

// const moment = require('moment');

const SINGLETON = {};

SINGLETON.EMPTY_ARRAY = [];

SINGLETON.join = function(array, separator) {
    if (array == null) {
        return '';
    }
    return array.join(separator);
};

// SINGLETON.getDateValue=function(obj,path,format,defaultValue){
//     const value=SINGLETON.getValue(obj,path,null);

//     if (value === null){
//         return defaultValue;
//     } else {
//         return moment(value).format(format);
//     }
// };

SINGLETON.id = function(obj, defaultValue) {
    return SINGLETON.getValue(obj, 'id', defaultValue);
};

SINGLETON.hasId = function(obj, id) {
    const currentId = SINGLETON.getValue(obj, 'id', null);

    return (currentId === id);
};

SINGLETON.array = function(obj, path) {
    return SINGLETON.get(obj, path, SINGLETON.EMPTY_ARRAY);
};

SINGLETON.getValue = function(obj, path, defaultValue) {
    return SINGLETON.get(obj, path, defaultValue);
};

SINGLETON.get = function(obj, path, defaultValue) {
    if (typeof obj === 'undefined' || obj == null) {
        return defaultValue;
    }
    if (typeof path !== 'string' || !path) {
        return defaultValue;
    }
    const paths = path.split('.');
    let current = obj;
    let i = 0;

    for (i = 0; i < paths.length; i += 1) {
        const value = current[paths[i]];

        if (value === undefined || value === null) {
            return defaultValue;
        }
        current = value;
    }

    return current;
};

SINGLETON.log = function(obj) {
    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return null;
    }
    try {
        return JSON.stringify(obj, null, 4);
    } catch (err) {
        return `${obj}:${err}`;
    }
};

// From jQuery
SINGLETON.each = function(obj, callback) {
    let length;
    let i = 0;
    let ret;

    if (Array.isArray(obj)) {
        length = obj.length;
        for (; i < length; i += 1) {
            ret = callback.call(obj[i], obj[i], i);
            if (ret) {
                return ret;
            }
        }
    } else if (typeof obj === 'object') {
        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (i in obj) {
            ret = callback.call(obj[i], i, obj[i]);
            if (ret) {
                return ret;
            }
        }
    }

    return obj;
};

module.exports = SINGLETON;