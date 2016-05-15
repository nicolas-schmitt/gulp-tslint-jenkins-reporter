# gulp-tslint-jenkins-reporter
gulp-tslint checkstyle reporter, to be used by Jenkins (Hudson). Writes output to an xml file.

## Install
```bash
npm install gulp-tslint-jenkins-reporter -D
```

## Usage
```javascript
var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tslintReporter = require('gulp-tslint-jenkins-reporter');

gulp.task('lint', function() {
    return gulp.src('./src/*.ts')
        .pipe(tslint())
        .pipe(tslintReporter());
});
```

## Advanced usage
```javascript
var gulp = require('gulp');
var tslint = require('gulp-tslint');
var tslintReporter = require('gulp-tslint-jenkins-reporter');

gulp.task('lint', function() {
    return gulp.src('./src/*.ts')
        .pipe(tslint())
        .pipe(tslintReporter({
            sort: true,
            filename: 'checkstyle.xml',
            severity: 'error',
            pathBase: '/project'
            pathPrefix: ''
        }));
});
```

## Options

**sort**  
type: `boolean`  
default: `false`  
will sort the files alphabetically within the report using their path.

**filename**  
type: `string`  
default: `checkstyle.xml`  
the filename to write the report.

**severity**  
type: `string`  
default: `error`  
values: `error`|`warning`|`info`  
the checkstyle format has a severity field, tslint doesn't. This will set the severity field for every reported failure.

**pathBase**  
type: `string`  
default: `''`  
If given, the path of the files will be rebased according to the value. For instance, if your file path is
```
/my/awesome/yet/too/long/path/for/my/file.ts
```
and that you set 
```javascript
{
    pathBase: '/path/for/my'
}
```
you will end up with
```
/my/file.ts
```

**pathPrefix**  
type: `string`  
default: `''`  
a prefix to add to the path. Given the previous example, you could also add this :
```javascript
{
    pathBase: '/path/for/my',
    pathPrefix: '/src'
}
```
and end up with
```
/src/file.ts
```

## LICENSE

The MIT License (MIT)
