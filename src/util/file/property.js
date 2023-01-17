/**
 * This for reading properties files
 * https://www.npmjs.com/package/properties-reader
 */
const propertiesReader = require('properties-reader');

// const LogClass = require('../log');
// const Log = new LogClass(__filename);

const SINGLETON = class MyClass {
    static read(filePath) {
        const properties = propertiesReader(filePath);
        // properties.each((key, value) => {

        //     // https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
        //     // remove th e fisrst and last quotes
        //     value=value.replace(/^"(.*)"$/, '$1');

        //     properties.set(key,value);
        // });

        return properties;
    }
};

module.exports = SINGLETON;