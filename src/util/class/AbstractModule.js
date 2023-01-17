/**
 * Mother class for singletons, we will use the __filename to get some
 * information like paths uniq ID, etc ..
 */
// const Config = require('../config/config');
// const LogClass = require('../log');
// const Log = new LogClass(__filename);

const Singleton = require('./Singleton');

const Obj = require('../obj');

// This contains all the modules
const CACHE = {};

class AbstractModule extends Singleton {
    constructor(fileName, description = null) {
        super(fileName, description);

        AbstractModule.subscrive(this);
    }

    check() {
        // TODO Runtime Check class
    }

    static subscrive(module = null) {
        const id = Obj.id(module, null);

        if (id) {
            CACHE[id] = module;
        }
    }
}

module.exports = AbstractModule;