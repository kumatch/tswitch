var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

gulp.task("vendor", [ "vendor:fonts", "vendor:css", "vendor:js" ]);

gulp.task('vendor:fonts', function() {
    var fonts = [
        'bower_components/bootstrap/fonts/glyphicons-halflings-regular.*',
    ];

    return gulp.src(fonts)
        .pipe(gulp.dest('./public/assets/fonts/'))
        .pipe(livereload());
});

gulp.task('vendor:css', function() {
    var styles = [
        "bower_components/bootstrap/dist/css/bootstrap.css",
        "imports/startbootstrap-simple-sidebar/css/simple-sidebar.css"
    ];

    return gulp.src(styles)
        .pipe(concat("vendors.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/assets/css/'))
        .pipe(livereload());
});

gulp.task('vendor:js', function () {
    var scripts = [
        "./node_modules/setimmediate/setImmediate.js",
        // "./bower_components/jquery/dist/jquery.js",
        // "./bower_components/bootstrap/dist/js/bootstrap.js",
    ];

    return gulp.src(scripts)
        .pipe(concat("vendors.js"))
        .pipe(uglify({ preserveComments:'some' }))
        .pipe(gulp.dest('public/assets/js'))
        .pipe(livereload());
});
