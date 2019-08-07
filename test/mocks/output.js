'use strict'

/* eslint-disable no-param-reassign */

const clean = {
  fileName: 'clean.ts',
  path: '/home/ubuntu/workspace/sandbox/data/clean.ts',
  failures: [],
}

const dirty = {
  fileName: 'dirty.ts',
  path: '/home/ubuntu/workspace/sandbox/data/dirty.ts',
  failures: [
    '\n<error line="8" column="5" severity="error" message="default access modifier on member/method not allowed" source="member-access"/>',
    '\n<error line="2" column="16" severity="error" message="expected member-variable-declaration: &#39;str&#39; to have a typedef" source="typedef"/>',
  ],
}

const awful = {
  fileName: 'awful.ts',
  path: '/home/ubuntu/workspace/sandbox/data/awful.ts',
  failures: [
    '\n<error line="7" column="5" severity="error" message="default access modifier on member / method not allowed" source="member-access"/>',
    '\n<error line="4" column="19" severity="error" message="block is empty" source="no-empty"/>',
    '\n<error line="9" column="20" severity="error" message="object access via string literals is disallowed" source="no-string-literal"/>',
    '\n<error line="6" column="1" severity="error" message="trailing whitespace" source="no-trailing-whitespace"/>',
    '\n<error line="2" column="13" severity="error" message="unused variable: &#39;str&#39;" source="no-unused-variable"/>',
    '\n<error line="8" column="9" severity="error" message="forbidden &#39;var&#39; keyword, use &#39;let&#39; or &#39;const&#39; instead" source="no-var-keyword"/>',
    '\n<error line="8" column="21" severity="error" message="missing semicolon" source="semicolon"/>',
    '\n<error line="2" column="16" severity="error" message="expected member - variable - declaration: &#39;str&#39; to have a typedef" source="typedef"/>',
    '\n<error line="7" column="10" severity="error" message="expected call - signature: &#39;chop&#39; to have a typedef" source="typedef"/>',
  ],
}

function setFileProperty(data) {
  data.file = data.failures.reduce((result, failure) => result + failure, `\n<file name="${data.fileName}">`)
  data.file += '\n</file>'
}

setFileProperty(clean)
setFileProperty(dirty)
setFileProperty(awful)

module.exports = { clean, dirty, awful }
