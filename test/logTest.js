/*
 * Test the log class
 */


const chai = require('chai');
const Log = require('../src/util/log');



describe('Log', () => {
    let logger;
    beforeEach(() => {
        logger = new Log(__filename);
    });

    it('should print badge', function() {
        logger.printBadge('Test message');
    });


    it('should print badge', function() {
        logger.printBadge('Test message');
    });


});
