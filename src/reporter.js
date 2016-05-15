'use strict';

const _ = require('lodash');
const path = require('path');
const File = require('vinyl');
const Stream = require('readable-stream');
const plexer = require('plexer');
const fs = require('fs');

const Formatter = require('./formatter');

module.exports = {
    report: report,
    getReportedFilePath: getReportedFilePath
};

function report(options) {
    const inputStream = new Stream.Transform({ objectMode: true });
    const outputStream = new Stream.PassThrough({ objectMode: true });
    const stream = plexer({ objectMode: true }, inputStream, outputStream);
    let filesBuffer = [];
    
    options = options || {};
    
    _.defaults(options, {
        sort: false,
        filename: 'checkstyle.xml',
        severity: 'error',
        pathBase: '',
        pathPrefix: ''
    });
    
    const formatter = new Formatter(options);
    
    inputStream._transform = function(file, unused, done) {
        const vinyl = new File(file);
        const reportPath = getReportedFilePath(options, vinyl);
        filesBuffer.push({
            xml: formatter.formatFile(reportPath, file.tslint.failures),
            path: reportPath
        });

        outputStream.write(file);
        done();
    };
    
    inputStream._flush = function(done) {
        if (options.sort) {
            filesBuffer = _.sortBy(filesBuffer, 'path');
        }
        
        const content = formatter.formatStream(filesBuffer, options);
        fs.writeFile(options.filename, content, function(err) {
            if (err) {
                console.error(err);
            }
            
            done();
        });
    };
    
    return stream;
}

function getReportedFilePath(options, vinyl) {
    let result = vinyl.path;
    
    if (options) {
        if (options.pathBase) {
            const index = result.indexOf(options.pathBase);
            if (index > 0) {
                result = result.substr(index + options.pathBase.length);
            }
        }
        
        if (options.pathPrefix) {
            result = options.pathPrefix + result;
        }
    }
    
    return path.normalize(result);
}
