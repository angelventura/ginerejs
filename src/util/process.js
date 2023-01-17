/**
 * This is for OS library:
 * https://nodejs.org/api/os.html#os_os_constants
 */
const Process = require('process');

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

SINGLETON.getegid = function(defaultValue = null) {
    return osCall(() => Process.getegid(), defaultValue);
};

SINGLETON.geteuid = function(defaultValue = null) {
    return osCall(() => Process.geteuid(), defaultValue);
};

SINGLETON.getgid = function(defaultValue = null) {
    return osCall(() => Process.getgid(), defaultValue);
};

SINGLETON.getuid = function(defaultValue = null) {
    return osCall(() => Process.getuid(), defaultValue);
};

SINGLETON.getpid = function(defaultValue = null) {
    return osCall(() => Process.pid, defaultValue);
};

SINGLETON.getplatform = function(defaultValue = null) {
    return osCall(() => Process.platform, defaultValue);
};

SINGLETON.getppid = function(defaultValue = null) {
    return osCall(() => Process.ppid, defaultValue);
};

SINGLETON.getrelease = function(defaultValue = null) {
    return osCall(() => Process.release, defaultValue);
};

SINGLETON.getInformation = function() {
    return {
        getegid: SINGLETON.getegid(),
        geteuid: SINGLETON.geteuid(),
        getgid: SINGLETON.getgid(),
        getuid: SINGLETON.getuid(),
        getpid: SINGLETON.getpid(),

        getplatform: SINGLETON.getplatform(),
        getppid: SINGLETON.getppid(),
        getrelease: SINGLETON.getrelease(),
    };
};

module.exports = SINGLETON;