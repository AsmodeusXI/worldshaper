var gulp = require('gulp');
var del = require('del');
var Server = require('karma').Server;
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    scripts: ['src/worldshaper.js', 'src/**/*module.js', 'src/**/*Ctrl.js', 'src/**/*Svc.js'],
    angular: 'node_modules/angular/**/*.min.js',
    tests: 'src/**/*Spec.js',
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
                .pipe(sourcemaps.init())
                .pipe(concat('internal.js'))
                .pipe(sourcemaps.write('maps'))
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:third-party', function () {
    return gulp.src(paths.angular)
                .pipe(concat('third-party.js'))
                .pipe(gulp.dest(paths.output));
});

gulp.task('build', [
    'clean:dist',
    'build:internal',
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
    gulp.watch(paths.scripts, ['default']);
    gulp.watch(paths.tests, ['tests:run']);
});
