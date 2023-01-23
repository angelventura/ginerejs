/*
 * Test the log class
 */

const mocha = require('mocha');
// User el typo commo modulo: "type": "module"
// import { describe, beforeEach, it } from 'mocha'

// const chai = require('chai');
const Log = require('../src/util/log');

const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;

describe('Log', () => {
    let logger;
    beforeEach(() => {
        logger = new Log(__filename);
    });

    it('should print badge', () => {
        logger.printBadge('Test message');
    });

    it('should print badge', () => {
        logger.printBadge('Test message');
    });
});