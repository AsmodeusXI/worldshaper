const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const del = require('del');
const Server = require('karma').Server;

const paths = {
    scripts: ['src/**/*.js', '!src/**/*Spec.js'],
    scriptsNoConfig: ['src/**/*.js', '!src/**/*Spec.js', '!src/config/*.js'],
    tests: 'src/**/*Spec.js',
    angular: 'node_modules/angular/**/*.min.js',
    styles: [
        'node_modules/font-awesome/css/font-awesome.min.css'
    ],
    fonts: [
        'node_modules/font-awesome/fonts/**/*'
    ],
    less: 'src/**/*.less',
    html: 'src/**/*.html',
    source: 'src',
    output: 'dist',
    config: 'src/config'
}

const wrapper = '(function () {\n\"use strict\";\n\n<%= module %>\n})();'

const options = {
    local: {
        environment: 'local',
        wrap: wrapper
    },
    prod: {
        environment: 'production',
        wrap: wrapper
    }
}

gulp.task('clean:dist', function () {
    del.sync([
        paths.output,
        paths.config
    ]);
});

gulp.task('build:local-config', function () {
    return gulp.src('config/worldshaperConfig.json')
            .pipe(plugins.ngConfig('worldshaper.config', options.local))
            .pipe(gulp.dest(paths.config));
});

gulp.task('build:prod-config', function () {
    return gulp.src('config/worldshaperConfig.json')
            .pipe(plugins.ngConfig('worldshaper.config', options.prod))
            .pipe(gulp.dest(paths.config));
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

gulp.task('build:copy-html', function () {
    return gulp.src(paths.html)
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:angular', function () {
    return gulp.src(paths.angular)
                .pipe(plugins.concat('third-party.js'))
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:styles', function () {
    return gulp.src(paths.styles)
                .pipe(gulp.dest(paths.output));
});

gulp.task('build:fonts', function () {
    return gulp.src(paths.fonts)
                .pipe(gulp.dest(paths.output + '/fonts'));
});

gulp.task('build:less', function () {
    return gulp.src(paths.less)
                .pipe(plugins.less())
                .pipe(gulp.dest(paths.output))
                .pipe(plugins.livereload());
});

gulp.task('build:third-party', [
    'build:angular',
    'build:styles',
    'build:fonts'
]);

gulp.task('build-local', function (callback) {
    runSequence(
        'clean:dist',
        'build:local-config',
        'build:internal',
        'build:copy-html',
        'build:less',
        'build:third-party',
        callback
    );
});

gulp.task('build-prod', function (callback) {
    runSequence(
        'clean:dist',
        'build:prod-config',
        'build:internal',
        'build:copy-html',
        'build:less',
        'build:third-party',
        callback
    );
});

gulp.task('tests:run', ['build-local'], function (done) {
    new Server ({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('default', ['build-local','tests:run']);
gulp.task('prod', ['build-prod', 'tests:run']);

gulp.task('listen', ['default'], function () {
    plugins.livereload.listen();
    gulp.watch(paths.scriptsNoConfig, ['default']).on('change', plugins.livereload.changed);
    gulp.watch(paths.less, ['build:less']).on('change', plugins.livereload.changed);
    gulp.watch(paths.html, ['build:less']).on('change', plugins.livereload.changed);
    gulp.watch(paths.tests, ['tests:run']).on('change', plugins.livereload.changed);
});
