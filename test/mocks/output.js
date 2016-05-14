'use strict';

const _ = require('lodash');

let clean = {
    fileName: 'clean.ts',
    path: '/home/ubuntu/workspace/sandbox/data/clean.ts',
    failures: [
    ]
};

let dirty = {
    fileName: 'dirty.ts',
    path: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
    failures: [
        '<error line="7" column="4" severity="warning" message="default access modifier on member/method not allowed" source="member-access"/>',
        '<error line="1" column="15" severity="warning" message="expected member-variable-declaration: &#39;str&#39; to have a typedef" source="typedef"/>'
    ]
};

let awful = {
    fileName: 'awful.ts',
    path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
    failures: [
        '<error line="6" column="4" severity="warning" message="default access modifier on member / method not allowed" source="member-access"/>',
        '<error line="3" column="18" severity="warning" message="block is empty" source="no-empty"/>',
        '<error line="8" column="19" severity="warning" message="object access via string literals is disallowed" source="no-string-literal"/>',
        '<error line="5" column="0" severity="warning" message="trailing whitespace" source="no-trailing-whitespace"/>',
        '<error line="1" column="12" severity="warning" message="unused variable: &#39;str&#39;" source="no-unused-variable"/>',
        '<error line="7" column="8" severity="warning" message="forbidden &#39;var&#39; keyword, use &#39;let&#39; or &#39;const&#39; instead" source="no-var-keyword"/>',
        '<error line="7" column="20" severity="warning" message="missing semicolon" source="semicolon"/>',
        '<error line="1" column="15" severity="warning" message="expected member - variable - declaration: &#39;str&#39; to have a typedef" source="typedef"/>',
        '<error line="6" column="9" severity="warning" message="expected call - signature: &#39;chop&#39; to have a typedef" source="typedef"/>'
    ]
};

function setFileProperty(data) {
    data.file = _.reduce(data.failures, (result, failure) => {
        return result += failure;
    }, `<file name="${data.fileName}">`);
    
    data.file += '</file>';
}

setFileProperty(clean);
setFileProperty(dirty);
setFileProperty(awful);

module.exports = {
    clean:clean,
    dirty:dirty,
    awful:awful
};