'use strict';

const _ = require('lodash');
const DefaultPosition = {
    position: 0,
    lineAndCharacter: {
        character: 0,
        line: 0
    }
};

class Formatter {
    constructor(options) {
        this.options = _.defaults(options, {
            severity: 'error'
        });
    }
    
    formatStream(files) {
        let xml = _.map(files, 'xml');
        
        return `<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">${xml}</checkstyle>`;
    }
    
    formatFile(fileName, failures) {
        let result = _.reduce(failures, (rslt, failure) => {
            return rslt += this.formatError(failure);
        }, `<file name="${fileName}">`);
        
        result += '</file>';
        
        return result;
    }
    
    formatError(failure) {
        const start = failure.startPosition || DefaultPosition;
        const line = start.lineAndCharacter.line;
        const character = start.lineAndCharacter.character;
        const message = _.escape(failure.failure);
        const severity = this.options.severity;
        
        return `<error line="${line}" column="${character}" severity="${severity}" message="${message}" source="${failure.ruleName}"/>`;
    }
}

module.exports = Formatter;
