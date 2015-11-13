/*
 *	Task Automation to make my life easier.
 *	Author: Jean-Pierre Sierens
 *	===========================================================================
 */

// declarations, dependencies
// ----------------------------------------------------------------------------
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var reactify = require('reactify');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'react/addons'
];
// keep a count of the times a task refires
var scriptsCount = 0;

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function () {
    bundleApp(true);
});

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', function () {
    gulp.watch(['./src/main/javascript/**/*.js', '!./src/main/webapp/*.js'], ['scripts']);
});

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
    scriptsCount++;
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    var appBundler = browserify({
        entries: './src/main/javascript/app.js',
        debug: true
    });

    // If it's not for production, a separate vendors.js file will be created
    // so that we don't have to rebundle things like react everytime there's a
    // change in the js file
    if (!isProduction && scriptsCount === 1) {
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./src/main/webapp/js/'));
    }
    if (!isProduction) {
        // make the dependencies external so they dont get bundled by the
        // app bundler. Dependencies are already bundled in vendor.js for
        // development environments.
        dependencies.forEach(function (dep) {
            appBundler.external(dep);
        })
    }

    appBundler
        // transform ES6 and JSX to ES5 with babelify
        .transform(babelify)
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./src/main/webapp/js/'));

    // Copy index.html to src/main/webapp
    gulp.src('index.html').pipe(gulp.dest('./src/main/webapp/'));
}
