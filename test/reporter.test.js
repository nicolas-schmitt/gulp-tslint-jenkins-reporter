'use strict';

const chai = require('chai');
const expect = chai.expect;

const reporter = require('../src/reporter');

describe('reporter', function() {
    const path = '/home/ubuntu/workspace/src/file.js';
    const vinlyShim = {
        path: path
    };
    
    describe('#getReportedFilePath', function() {
        it('shouldn\'t rebase the path when options.pathBase is undefined', function() {
            const actual = reporter.getReportedFilePath({}, vinlyShim);
            expect(actual).to.be.equal(vinlyShim.path);
        });

        it('shouldn\'t rebase the path when options.pathBase is empty', function() {
            const actual = reporter.getReportedFilePath({pathBase: ''}, vinlyShim);
            expect(actual).to.be.equal(vinlyShim.path);
        });

        it('should rebase the path when options.pathBase is set', function() {
            const actual = reporter.getReportedFilePath({pathBase: '/workspace'}, vinlyShim);
            expect(actual).to.be.equal('/src/file.js');
        });
        
        it('should prepend the path when options.pathPrefix is set', function() {
            const actual = reporter.getReportedFilePath({pathPrefix: '/project'}, vinlyShim);
            expect(actual).to.be.equal('/project' + vinlyShim.path);
        });
        
        it('should prepend and rebase the path when both options are set', function() {
            const actual = reporter.getReportedFilePath({
                pathBase: '/workspace',
                pathPrefix: '/project'
            }, vinlyShim);
            expect(actual).to.be.equal('/project/src/file.js');
        });
    });
});
