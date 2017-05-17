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
    constructor(settings) {
        this.settings = _.defaults(settings, {
            severity: 'error'
        });
    }

    formatStream(files) {
        const xml = _.map(files, 'xml').join('');

        return `<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="4.3">${xml}\n</checkstyle>`;
    }

    formatFile(fileName, failures) {
        const result = [`\n<file name="${fileName}">`];
        _.forEach(failures, (failure) => {
            result.push(this.formatError(failure));
        });
        result.push('\n</file>');

        return result.join('');
    }

    formatError(failure) {
        const start = failure.startPosition || DefaultPosition;
        const line = start.lineAndCharacter.line;
        const column = start.lineAndCharacter.character;
        const message = _.escape(failure.failure);
        const severity = failure.ruleSeverity || this.settings.severity;
        const ruleName = failure.ruleName;

        return `\n<error line="${line}" column="${column}" severity="${severity}" message="${message}" source="${ruleName}"/>`;
    }
}

module.exports = Formatter;
