/**
 * Ginere File systems.
 * See: ~/projects/spoonapps/projects/black-site/node_modules/ginere-core/src/gfs.js
 */
// const fs = require('graceful-fs');
const fs = require('graceful-fs');
const LogClass = require('../log');

const Log = new LogClass(__filename);

const Obj = require('../obj');

const GFS = {};

/**
 * https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode
 */
GFS.canReadSync = function(path) {
    try {
        fs.accessSync(path, fs.R_OK);

        return true;
    } catch (err) {
        Log.debug(`Error:${err}`);
        return false;
    }
};

// GFS.canRead = function(path) {
//     try {
//         fs.access(path, fs.R_OK);

//         return true;
//         TOTOT VER EL ANTIGU GFS
//     } catch (err) {
//         Log.debug(`Error:${err}`);
//         return false;
//     }
// };

GFS.canReadDirSync = function(path) {
    const stat = GFS.statSync(path, null);

    if (stat) {
        Log.info('Stats:', stat);

        if (stat.isDirectory()) {
            return GFS.canReadSync(path);
        }
    }

    return false;
};

/*
 * https://nodejs.org/api/fs.html#fs_fs_statsync_path_options
 * This retuns https://nodejs.org/api/fs.html#fs_class_fs_stats
 */
GFS.statSync = function(path, defaultValue = null) {
    try {
        const value = fs.statSync(path);

        return value;
    } catch (err) {
        Log.debug(`Error:${err}`);
        return defaultValue;
    }
};

/*
 * https://nodejs.org/api/fs.html#fs_fs_statsync_path_options
 * This retuns https://nodejs.org/api/fs.html#fs_class_fs_stats
 */
GFS.stat = async function(path, defaultValue = null) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if (err) {
                // reject(new Error(`Path:${path}`, err));
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
};

/**
 * This iterate on child dirs. This returns the value of the iterador.
 * Or default value if nothing has been found.
 * Iterator will return a promisse.
 *
 * https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
 *
 * https://javascript.info/async-await
 */
// GFS.itrerateOnDirs = async function(path, iterator) {
//     const deferred = Promise.defer();

//     fs.readdir(path, (err, files) => {
//         const promises = [];

//         Obj.each(files, (value, index) => {
//             const p = iterator(value);
//             promises.push(p);
//         });

//         deferred.resolve(promises);
//     });

//     // try {
//     //     await Promise.all(promises);

//     //     return true;
//     // } catch (err) {
//     //     Log.error("Path:" + path, err);
//     //     throw err;
//     // }
//     // promises.push(new Promise((resolve) => setTimeout(resolve, 100)));

//     // return Promise.all(promises);

//     return deferred.promise;
// };

/**
 * This iterate on child dirs. This returns the value of the iterador.
 * Or default value if nothing has been found.
 * Iterator will return a promisse.
 *
 * https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback
 *
 * https://javascript.info/async-await
 */
GFS.itrerateOnDirs = async function(path, iterator) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                const promises = [];

                Obj.each(files, (value, index) => {
                    const p = iterator(value);
                    promises.push(p);
                });

                // Promise.all(promises);
                resolve(Promise.all(promises));
            }
        });
    });
};

GFS.writeBinary = function(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(`The file: ${path} was saved!`);
                resolve(path);
            }
        });
    });
};

module.exports = GFS;