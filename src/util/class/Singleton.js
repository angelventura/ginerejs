/**
 * Mother class for singletons, we will use the __filename to get some
 * information like paths uniq ID, etc ..
 */
const Config = require('../config/config');
const LogClass = require('../log');

// eslint-disable-next-line no-unused-vars
const Log = new LogClass(__filename);

class Singleton {
    constructor(fileName, description = null) {
        this.fileName = fileName;
        this.fileRelativePath = Config.relative(fileName);
        this.baseName = Config.basename(fileName);

        this.baseNameNoExt = Config.noExt(this.baseName);

        this.fileId = this.fileRelativePath;
        this.description = description;
    }
}

module.exports = Singleton;