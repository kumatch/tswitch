var gulp = require('gulp');
var jade = require('gulp-jade');
var babel = require("gulp-babel");
var reactJade = require('gulp-react-jade');
var watch = require("gulp-watch");
var watchify = require('gulp-watchify');
var reactify = require('reactify');
var streamify = require("gulp-streamify");
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');

var argv = require("yargs").argv;
var production = argv.production ? true : false;
var watching = false;

gulp.task("build", function (callback) {
    runSequence("build:common", "build:browserify", callback);
});

gulp.task("build:common", [
    'build:js',
    'build:html',
    'build:react-jade'
]);

gulp.task('build:js', function () {
    var src = [
        "src/**/*.js",
        "!src/**/.#*.js"
    ];

    return gulp.src(src)
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('build:html', function() {
    var YOUR_LOCALS = {};
    var templates = [
        "templates/**/*.jade",
        "!templates/**/_*.jade"
    ];

    gulp.src(templates)
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest("public"))
        .pipe(livereload());
});

gulp.task('build:react-jade', function () {
    var templates = [
        "src/**/*.template.jade"
    ];

    return gulp.src(templates)
        .pipe(reactJade())
        .pipe(gulp.dest('build'));
});


gulp.task("build:browserify", watchify(function (watchify) {
    var src = [
        "build/app.js"
    ];

    var b = gulp.src(src)
        .pipe(watchify({
            watch: watching,
            debug: !production,
            setup: function (bundle) {
                bundle.transform(reactify);
            }
        }));

    if (production) {
        b = b.pipe(streamify(uglify({ preserveComments:'some' })));
    }

    return b.pipe(gulp.dest('public/assets/js'))
        .pipe(livereload());
}));


gulp.task('enable-watch-mode', function () {
    watching = true;
    livereload.listen();
});

gulp.task('watch', function () {
    runSequence("enable-watch-mode", "build", function () {

        watch([ "src/**/*.js", "!src/**/.#*.js"] , function () {
            gulp.start("build:js");
        });

        watch([ "templates/**/*.jade" ], function () {
            gulp.start("build:html");
        });

        watch([ "src/**/*.template.jade" ], function () {
            gulp.start("build:react-jade");
        });

        // gulp.watch(, ['build:js']);
        // gulp.watch([ "templates/**/*.jade" ],         ['build:html']);
        // gulp.watch([  ],      ['build:react-jade']);
    });
});
