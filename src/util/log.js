/**
 * To get a logger
 */
const Debug = require('debug');
const path = require('path');

const Obj = require('./obj');

const SEPARATOR = '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++';

const SINGLETON = class LogClass {
    constructor(filename) {
        if (!filename) {
            this.print = Debug('');
        } else {
            const ext = path.extname(filename);

            const relative = path.relative('./', filename);

            const withoutExt = relative.slice(0, -ext.length);

            const ret = withoutExt.split(path.sep).join(':');

            // eslint-disable-next-line max-len
            // /Users/mendogomeza/projects/spoonapps/projects/docker-example/src/server.js -> src:server
            this.print = Debug(ret);
        }
    }

    printBadge(msg) {
        this.print(`\n${SEPARATOR}\n${msg}\n${SEPARATOR}\n`);
    }

    debug(msg, obj = null) {
        this.msg('Debug', msg, obj);
    }

    info(msg, obj = null) {
        this.msg('Info', msg, obj);
    }

    warn(msg, obj = null) {
        this.msg('Warn', msg, obj);
    }

    error(msg, obj = null) {
        this.errorMsg('ERROR', msg, obj);
    }

    fatal(msg, obj = null) {
        this.errorMsg('FATAL', msg, obj);
    }

    // eslint-disable-next-line class-methods-use-this
    log(obj) {
        if (typeof obj === 'undefined' || obj === null) {
            return '';
        }
        try {
            return JSON.stringify(obj, null, 4);
        } catch (err) {
            return `${obj}:${err}`;
        }
    }

    msg(level = 'No Level', msg, obj = null) {
        if (typeof msg === 'object' && msg !== null) {
            this.print(`${level}: ${this.log(msg)} ${this.log(obj)}`);
        } else {
            this.print(`${level}: ${msg} ${this.log(obj)}`);
        }
    }

    errorMsg(level = 'No Level', msg, obj = null) {
        if (typeof msg === 'object' && msg !== null) {
            this.print(`${level}: ${Obj.log(msg)} ${this.log(obj)}`);
            // eslint-disable-next-line no-console
            console.error(`${level}: ${Obj.log(msg)} ${this.log(obj)}`);
        } else {
            this.print(`${level}: ${msg} ${this.log(obj)}`);
            // eslint-disable-next-line no-console
            console.error(`${level}: ${msg} ${this.log(obj)}`);
        }
    }
};


module.exports = SINGLETON;