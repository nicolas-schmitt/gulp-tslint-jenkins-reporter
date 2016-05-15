'use strict';

const _ = require('lodash');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-spies'));
chai.use(require('chai-string'));
chai.use(require('chai-xml'));

const Formatter = require('../src/formatter');
const inputMock = require('./mocks/input');
const outputMock = require('./mocks/output');

describe('formatter', function() {
    describe('#formatError', function() {
        it('should return a valid xml', function() {
            _.forEach(inputMock, function(input, name) {
                _.forEach(input.tslint.failures, function(failure, i) {
                    let formatter = new Formatter();
                    let actualXml = formatter.formatError(failure);
                    expect(actualXml).xml.to.be.valid();
                });
            });
        });
        
        it('should return the xml corresponding to the failure', function() {
            _.forEach(inputMock, function(input, name) {
                _.forEach(input.tslint.failures, function(failure, i) {
                    let formatter = new Formatter();
                    let actualXml = formatter.formatError(failure);
                    expect(actualXml).to.be.equal(outputMock[name].failures[i]);
                });
            });
        });
    });
    
    describe('#formatFile', function() {
        it('should return a valid xml', function() {
            _.forEach(inputMock, function(input, name) {
                let formatter = new Formatter();
                let actualXml = formatter.formatFile(input.basename, input.tslint.failures);
                expect(actualXml).xml.to.be.valid();
            });
        });
        
        it('should return an empty file element when there is no failure', function() {
            let formatter = new Formatter();
            expect(formatter.formatFile(inputMock.clean.basename, inputMock.clean.tslint.failures))
                .to.equal(outputMock.clean.file);
        });
        
        _.forEach(inputMock, function(input, name) {
            let failureCount = input.tslint.failures.length;
            it(`should call #formatError ${failureCount} time(s) for ${name}`, function() {
                let formatter = new Formatter();
                let spy = chai.spy.on(formatter, 'formatError');
                formatter.formatFile(input.basename, input.tslint.failures);
                expect(spy).to.have.been.called.exactly(failureCount);
            });
        });
        
        it('should return a file element with as many children as failure', function() {
            _.forEach(inputMock, function(input, name) {
                let formatter = new Formatter();
                let failureCount = input.tslint.failures.length;
                let actualXml = formatter.formatFile(input.basename, input.tslint.failures);
                expect(actualXml).to.have.entriesCount('<error', failureCount);
            });
        });
    });
    
    describe('#formatStream', function() {
        it('should return a valid xml', function() {
            let formatter = new Formatter();
            let files = _.map([outputMock.clean, outputMock.dirty, outputMock.awful], function(mock) {
                return {
                    path: mock.path,
                    xml: mock.file
                };
            });
            let actualXml = formatter.formatStream(files);
            expect(actualXml).xml.to.be.valid();
        });
        
        it('should return a checkstyle element with as many children as file', function() {
            let formatter = new Formatter();
            let files = _.map([outputMock.clean, outputMock.dirty, outputMock.awful], function(mock) {
                return {
                    path: mock.path,
                    xml: mock.file
                };
            });
            let actualXml = formatter.formatStream(files);
            expect(actualXml).to.have.entriesCount('<checkstyle', 1);
            expect(actualXml).to.have.entriesCount('<file', files.length);
        });
    });
});
