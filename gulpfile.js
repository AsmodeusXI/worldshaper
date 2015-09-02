var gulp = require('gulp');
var Server = require('karma').Server;

var paths = {
    scripts: 'src/**/*.js',
    tests: 'src/**/*Spec.js'
}

gulp.task('test', function (done) {
    new Server ({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['test']);
    gulp.watch(paths.tests, ['test']);
});

gulp.task('default', ['watch', 'test']);
