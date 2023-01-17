/*
 * Test the log class
 */

const chai = require('chai');
const Log = require('../src/log');



describe('Log', () => {

    it('should print badge', function() {
        Log.printBadge('Test message');
    });

});

