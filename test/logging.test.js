var PrettyStream = require('../lib/logging/PrettyStream');
var GhostLogger = require('../lib/logging/GhostLogger');
var sinon = require('sinon');
var should = require('should');
var sandbox = sinon.sandbox.create();

describe('Logging', function () {
    afterEach(function () {
        sandbox.restore();
    });

    // in Bunyan 1.8.3 they have changed this behaviour
    // they are trying to find the err.message attribute and forward this as msg property
    // our PrettyStream implementation can't handle this case
    it('ensure stdout write properties', function (done) {
        sandbox.stub(PrettyStream.prototype, 'write', function (data) {
            should.exist(data.req);
            should.exist(data.res);
            should.exist(data.err);
            data.msg.should.eql('');
            done();
        });

        var ghostLogger = new GhostLogger();
        ghostLogger.info({err: new Error('message'), req: {body: {}}, res: {headers: {}}});
    });
});