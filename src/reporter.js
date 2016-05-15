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
    
    _.defaults(options, {
        sort: false,
        filename: 'checkstyle.xml',
        severity: 'error',
        pathBase: '',
        pathPrefix: ''
    });
    
    const formatter = new Formatter(options);
    
    inputStream._transform = function(file, unused, done) {
        let vinyl = new File(file);
        let path = getReportedFilePath(options, vinyl);
        filesBuffer.push({
            xml: formatter.formatFile(path, file.tslint.failures),
            path: path
        });

        outputStream.write(file);
        done();
    };
    
    inputStream._flush = function(done) {
        if (options.sort) {
            filesBuffer = _.sortBy(filesBuffer, 'path');
        }
        
        let report = formatter.formatStream(filesBuffer, options);
        fs.writeFile(options.filename, report, function(err) {
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
            let index = result.indexOf(options.pathBase);
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
