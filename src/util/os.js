/**
 * This is for OS library:
 * https://nodejs.org/api/os.html#os_os_constants
 */
const OS = require('os');

const LogClass = require('./log');

const Log = new LogClass(__filename);

const SINGLETON = {};

function osCall(f, defaultValue = null) {
    if (f === null) {
        return defaultValue;
    }
    try {
        return f();
    } catch (err) {
        Log.warn('Calling OS', err);
        return defaultValue;
    }
}

SINGLETON.hostname = function(defaultValue = null) {
    // try {
    //     const ret = OS.hostname();

    //     return ret;
    // } catch (err) {
    //     Log.warn('Geting OS name', err);
    //     return defaultValue;
    // }

    return osCall(() => OS.hostname(), defaultValue);
};

SINGLETON.arch = function(defaultValue = null) {
    // try {
    //     const ret = OS.arch();

    //     return ret;
    // } catch (err) {
    //     Log.warn('Geting OS name', err);
    //     return defaultValue;
    // }
    return osCall(() => OS.hostname(), defaultValue);
};

SINGLETON.freemem = function(defaultValue = null) {
    return osCall(() => OS.freemem(), defaultValue);
};

SINGLETON.homedir = function(defaultValue = null) {
    return osCall(() => OS.homedir(), defaultValue);
};

SINGLETON.loadavg = function(defaultValue = null) {
    return osCall(() => OS.loadavg(), defaultValue);
};

SINGLETON.platform = function(defaultValue = null) {
    return osCall(() => OS.platform(), defaultValue);
};

SINGLETON.release = function(defaultValue = null) {
    return osCall(() => OS.release(), defaultValue);
};

SINGLETON.tmpdir = function(defaultValue = null) {
    return osCall(() => OS.tmpdir(), defaultValue);
};

SINGLETON.totalmem = function(defaultValue = null) {
    return osCall(() => OS.totalmem(), defaultValue);
};

SINGLETON.type = function(defaultValue = null) {
    return osCall(() => OS.type(), defaultValue);
};

SINGLETON.uptime = function(defaultValue = null) {
    return osCall(() => OS.uptime(), defaultValue);
};

SINGLETON.version = function(defaultValue = null) {
    return osCall(() => OS.version(), defaultValue);
};

SINGLETON.getInformation = function() {
    return {
        hostname: SINGLETON.hostname(),
        arch: SINGLETON.arch(),
        freemem: SINGLETON.freemem(),
        homedir: SINGLETON.homedir(),
        loadavg: SINGLETON.loadavg(),

        platform: SINGLETON.platform(),
        release: SINGLETON.release(),
        tmpdir: SINGLETON.tmpdir(),
        totalmem: SINGLETON.totalmem(),
        type: SINGLETON.type(),
        uptime: SINGLETON.uptime(),
        version: SINGLETON.version(),
    };
};

module.exports = SINGLETON;