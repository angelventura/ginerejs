/**
 * Some Error Helper Functions
 */
const SINGLETON = {};

SINGLETON.notFoundError = function(msg) {
    const ret = new Error(msg);

    ret.status = 404;

    return ret;
};

SINGLETON.rejectNotFoundError = function(msg) {
    const err = SINGLETON.notFoundError(msg);

    return Promise.reject(err);
};

SINGLETON.reject = function(msg) {
    const err = new Error(msg);

    return Promise.reject(err);
};

module.exports = SINGLETON;