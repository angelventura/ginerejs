/**
 * This gets the application configuration
 */
const fs = require('graceful-fs');
const yaml = require('js-yaml');

const Path = require('path');

const LogClass = require('../log');

const Log = new LogClass(__filename);

const Os = require('../os');

const Obj = require('../obj');

const NA = 'N/A';

const SINGLETON = class MyClass {
    constructor() {
        // Defining some global variables
        global.ROOT = Path.resolve('.');
        global.NA = NA;

        Log.info(`Global ROOT:${global.ROOT}`);

        this.packageJson = require('../../../../package.json');
        Log.info(`Readed package.json, version:${this.packageJson.version}`);

        const defaultConfig = require('../../../../conf/config.json');
        Log.info('Default Config:', defaultConfig);

        const hostConfig = MyClass.readConfiguration(null);
        Log.info('Host config:', hostConfig);

        this.config = {...defaultConfig, ...hostConfig };

        if (this.get('NODE_PRODUCTION', null)) {
            this.production = true;
            this.env = 'production';
        } else {
            this.env = this.get(['NODE_ENV', 'ENV', 'env'], null);
            if (this.env === 'production') {
                this.production = true;
            } else {
                this.production = false;
            }
        }

        this.NA = 'N/A';

        // this is the standard for production. This is used by express library
        if (this.production === true) {
            process.env.NODE_ENV = 'production';
        }

        Log.info(`Is production: ${this.production}`);
        Log.info(`Environment: ${this.env}`);
    }

    static readConfiguration(defaultValue = null) {
        const hostname = Os.hostname();
        Log.warn(`Reading configuration for server:${hostname}`);

        try {
            const fileName = require.resolve(`../../../../conf/${Os.hostname()}-config.yaml`);
            // const fileName = `./conf/${Os.hostname()}-config.yaml`;

            Log.info(`reading file:${fileName}`);

            const fileContents = fs.readFileSync(fileName, 'utf8');
            const data = yaml.load(fileContents);

            if (data) {
                return data;
            }
            return defaultValue;
        } catch (e) {
            Log.error(`Error reading configuration file conf/${Os.hostname()}-config.yaml`,e);
            return defaultValue;
        }
    }

    // eslint-disable-next-line class-methods-use-this
    getEnv(name = null, defaultValue = null) {
        const value = process.env[name];

        if (typeof value === 'undefined') {
            return defaultValue;
        }
        return value;
    }

    getPackage(path = null, defaultValue = null) {
        return Obj.get(this.packageJson, path, defaultValue);
    }

    getConfig(path = null, defaultValue = null) {
        return Obj.get(this.config, path, defaultValue);
    }

    get(path = null, defaultValue = null) {
        let ret;
        if (Array.isArray(path)) {
            ret = Obj.each(path, (v) => this.get(v, null));
            if (ret) {
                return ret;
            }
        }

        ret = this.getEnv(path, null);

        if (ret != null) {
            return ret;
        }

        ret = this.getConfig(path, null);
        if (ret != null) {
            return ret;
        }

        ret = this.getPackage(path, null);
        if (ret != null) {
            return ret;
        }

        return defaultValue;
    }

    getVersion() {
        return this.getPackage('version', NA);
    }

    getName() {
        return this.getPackage('name', NA);
    }

    isProduction() {
        return this.production;
    }

    getBoolean(path, defaultValue) {
        const val = this.get(path, null);

        if (val === null) {
            return defaultValue;
        }
        // eslint-disable-next-line eqeqeq
        if (val == true) {
            return true;
        }

        return false;
    }

    /*
     * from /Users/mendogomeza/proj ...  example/lib/util/config/class/Singleton.js
     *     ->
     *      lib/util/config/class/Singleton.js
     */
    // eslint-disable-next-line class-methods-use-this
    relative(fileName) {
        if (!fileName) {
            return fileName;
        }
        // eslint-disable-next-line no-undef
        return Path.relative(ROOT, fileName);
    }

    /*
     * from /Users/mendogome ... jects/docker-example/lib/util/config/class/Singleton.js
         ->  Singleton.js
     */
    // eslint-disable-next-line class-methods-use-this
    basename(fileName) {
        if (!fileName) {
            return fileName;
        }
        return Path.basename(fileName);
    }

    // eslint-disable-next-line class-methods-use-this
    noExt(fileName) {
        if (!fileName) {
            return fileName;
        }

        const index = fileName.lastIndexOf('.');

        if (index > 0) {
            return fileName.substr(0, index);
        }
        return fileName;
    }

    // eslint-disable-next-line class-methods-use-this
    ext(fileName) {
        if (!fileName) {
            return fileName;
        }

        const index = fileName.lastIndexOf('.');

        if (index > 0) {
            return fileName.substr(index, fileName.length);
        }
        return fileName;
    }
};

module.exports = new SINGLETON();
