module.exports = {
    clean: {
        basename: 'clean.ts',
        tslint: {
            failureCount: 0,
            failures: [],
            format: 'json',
            output: '[]'
        }
    },
    dirty: {
        basename: 'dirty.ts',
        tslint: {
            failureCount: 2,
            failures: [{
                endPosition: {
                    character: 5,
                    line: 10,
                    position: 180
                },
                failure: 'default access modifier on member/method not allowed',
                name: 'dirty.ts',
                ruleName: 'member-access',
                startPosition: {
                    character: 4,
                    line: 7,
                    position: 94
                }
            }, {
                endPosition: {
                    character: 16,
                    line: 1,
                    position: 30
                },
                failure: 'expected member-variable-declaration: \'str\' to have a typedef',
                name: 'dirty.ts',
                ruleName: 'typedef',
                startPosition: {
                    character: 15,
                    line: 1,
                    position: 29
                }
            }],
            format: 'json',
            output: '[{\"endPosition\":{\"character\":5,\"line\":10,\"position\":180},\"failure\":\"default access modifier on member/method not allowed\",\"name\":\"dirty.ts\",\"ruleName\":\"member-access\",\"startPosition\":{\"character\":4,\"line\":7,\"position\":94}},{\"endPosition\":{\"character\":16,\"line\":1,\"position\":30},\"failure\":\"expected member-variable-declaration: \'str\' to have a typedef\",\"name\":\"dirty.ts\",\"ruleName\":\"typedef\",\"startPosition\":{\"character\":15,\"line\":1,\"position\":29}}]'
        }
    },
    awful: {
        basename: 'awful.ts',
        tslint: {
            failureCount: 9,
            failures: [{
                endPosition: {
                    character: 5,
                    line: 9,
                    position: 136
                },
                failure: 'default access modifier on member / method not allowed',
                name: 'awful.ts',
                ruleName: 'member-access',
                startPosition: {
                    character: 4,
                    line: 6,
                    position: 72
                }
            }, {
                endPosition: {
                    character: 5,
                    line: 4,
                    position: 62
                },
                failure: 'block is empty',
                name: 'awful.ts',
                ruleName: 'no-empty',
                startPosition: {
                    character: 18,
                    line: 3,
                    position: 55
                }
            }, {
                endPosition: {
                    character: 26,
                    line: 8,
                    position: 128
                },
                failure: 'object access via string literals is disallowed',
                name: 'awful.ts',
                ruleName: 'no-string-literal',
                startPosition: {
                    character: 19,
                    line: 8,
                    position: 121
                }
            }, {
                endPosition: {
                    character: 4,
                    line: 5,
                    position: 67
                },
                failure: 'trailing whitespace',
                name: 'awful.ts',
                ruleName: 'no-trailing-whitespace',
                startPosition: {
                    character: 0,
                    line: 5,
                    position: 63
                }
            }, {
                endPosition: {
                    character: 15,
                    line: 1,
                    position: 29
                },
                failure: 'unused variable: \'str\'',
                name: 'awful.ts',
                ruleName: 'no-unused-variable',
                startPosition: {
                    character: 12,
                    line: 1,
                    position: 26
                }
            }, {
                endPosition: {
                    character: 11,
                    line: 7,
                    position: 92
                },
                failure: 'forbidden \'var\' keyword, use \'let\' or \'const\' instead',
                name: 'awful.ts',
                ruleName: 'no-var-keyword',
                startPosition: {
                    character: 8,
                    line: 7,
                    position: 89
                }
            }, {
                endPosition: {
                    character: 20,
                    line: 7,
                    position: 101
                },
                failure: 'missing semicolon',
                name: 'awful.ts',
                ruleName: 'semicolon',
                startPosition: {
                    character: 20,
                    line: 7,
                    position: 101
                }
            }, {
                endPosition: {
                    character: 16,
                    line: 1,
                    position: 30
                },
                failure: 'expected member - variable - declaration: \'str\' to have a typedef',
                name: 'awful.ts',
                ruleName: 'typedef',
                startPosition: {
                    character: 15,
                    line: 1,
                    position: 29
                }
            }, {
                endPosition: {
                    character: 10,
                    line: 6,
                    position: 78
                },
                failure: 'expected call - signature: \'chop\' to have a typedef',
                name: 'awful.ts',
                ruleName: 'typedef',
                startPosition: {
                    character: 9,
                    line: 6,
                    position: 77
                }
            }],
            format: 'json',
            output: '[{\"endPosition\":{\"character\":5,\"line\":9,\"position\":136},\"failure\":\"default access modifier on member/method not allowed\",\"name\":\"awful.ts\",\"ruleName\":\"member-access\",\"startPosition\":{\"character\":4,\"line\":6,\"position\":72}},{\"endPosition\":{\"character\":5,\"line\":4,\"position\":62},\"failure\":\"block is empty\",\"name\":\"awful.ts\",\"ruleName\":\"no-empty\",\"startPosition\":{\"character\":18,\"line\":3,\"position\":55}},{\"endPosition\":{\"character\":26,\"line\":8,\"position\":128},\"failure\":\"object access via string literals is disallowed\",\"name\":\"awful.ts\",\"ruleName\":\"no-string-literal\",\"startPosition\":{\"character\":19,\"line\":8,\"position\":121}},{\"endPosition\":{\"character\":4,\"line\":5,\"position\":67},\"failure\":\"trailing whitespace\",\"name\":\"awful.ts\",\"ruleName\":\"no-trailing-whitespace\",\"startPosition\":{\"character\":0,\"line\":5,\"position\":63}},{\"endPosition\":{\"character\":15,\"line\":1,\"position\":29},\"failure\":\"unused variable: \'str\'\",\"name\":\"awful.ts\",\"ruleName\":\"no-unused-variable\",\"startPosition\":{\"character\":12,\"line\":1,\"position\":26}},{\"endPosition\":{\"character\":11,\"line\":7,\"position\":92},\"failure\":\"forbidden \'var\' keyword, use \'let\' or \'const\' instead\",\"name\":\"awful.ts\",\"ruleName\":\"no-var-keyword\",\"startPosition\":{\"character\":8,\"line\":7,\"position\":89}},{\"endPosition\":{\"character\":20,\"line\":7,\"position\":101},\"failure\":\"missing semicolon\",\"name\":\"awful.ts\",\"ruleName\":\"semicolon\",\"startPosition\":{\"character\":20,\"line\":7,\"position\":101}},{\"endPosition\":{\"character\":16,\"line\":1,\"position\":30},\"failure\":\"expected member-variable-declaration: \'str\' to have a typedef\",\"name\":\"awful.ts\",\"ruleName\":\"typedef\",\"startPosition\":{\"character\":15,\"line\":1,\"position\":29}},{\"endPosition\":{\"character\":10,\"line\":6,\"position\":78},\"failure\":\"expected call-signature: \'chop\' to have a typedef\",\"name\":\"awful.ts\",\"ruleName\":\"typedef\",\"startPosition\":{\"character\":9,\"line\":6,\"position\":77}}]'
        }
    }
};
