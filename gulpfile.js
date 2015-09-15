var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var Server = require('karma').Server;

var paths = {
    scripts: ['src/worldshaper.js', 'src/**/*module.js', 'src/**/*Ctrl.js', 'src/**/*Svc.js'],
    angular: 'node_modules/angular/**/*.min.js',
    tests: 'src/**/*Spec.js',
    thirdparty: [
        'node_modules/angular/angular.min.js'
    ],
    tests: 'src/**/*Spec.js',
    less: 'src/**/*.less',
    html: 'src/**/*.html',
    output: 'dist',
    gulp: 'gulpfile.js'
}

gulp.task('clean:dist', function () {
    del.sync([
        paths.output
    ]);
});

gulp.task('build:internal', function () {
    return gulp.src(paths.scripts)
                .pipe(plugins.jshint())
                .pipe(plugins.jshint.reporter('jshint-stylish'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.uglify())
                .pipe(plugins.concat('internal.min.js'))
                .pipe(plugins.sourcemaps.write('maps'))
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:third-party', function () {
    return gulp.src(paths.angular)
                .pipe(plugins.concat('third-party.js'))
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:less', function () {
    return gulp.src(paths.less)
                .pipe(plugins.less())
                .pipe(gulp.dest(paths.output))
                .pipe(plugins.livereload());
});

gulp.task('build', [
    'clean:dist',
    'build:internal',
    'build:less',
    'build:third-party'
]);

gulp.task('tests:run', function (done) {
    new Server ({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('default', ['build', 'tests:run']);

gulp.task('listen', function () {
    gulp.start('default');
    plugins.livereload.listen();
    gulp.watch(paths.scripts, ['default']);
    gulp.watch(paths.less, ['build:less']);
    gulp.watch(paths.html, ['build:less']);
    gulp.watch(paths.tests, ['tests:run']);
});
