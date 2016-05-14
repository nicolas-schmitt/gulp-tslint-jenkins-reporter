'use strict';

const _ = require('lodash');

const DefaultSeverity = 'warning';
const DefaultPosition = {
    position: 0,
    lineAndCharacter: {
        character: 0,
        line: 0
    }
};

module.exports = {
    formatStream: formatStream,
    formatError: formatError,
    formatFile: formatFile
};

function formatStream(files, options) {
    let xml = _.map(files, 'xml');
    
    return `<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">${xml}</checkstyle>`;
}

function formatFile(fileName, failures) {
    let result = _.reduce(failures, (rslt, failure) => {
        return rslt += formatError(failure);
    }, `<file name="${fileName}">`);
    
    result += '</file>';
    
    return result;
}

function formatError(failure) {
    const start = failure.startPosition || DefaultPosition;
    const line = start.lineAndCharacter.line;
    const character = start.lineAndCharacter.character;
    const message = _.escape(failure.failure);
    
    return `<error line="${line}" column="${character}" severity="${DefaultSeverity}" message="${message}" source="${failure.ruleName}"/>`;
}
