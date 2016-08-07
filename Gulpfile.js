var gulp = require('gulp'),
    ngrok = require('ngrok'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    modRewrite = require('connect-modrewrite'),
    browserSync = require('browser-sync'),
    browserify = require('gulp-browserify'),
    ejs = require('gulp-ejs');

gulp.task('connect', function(){
    browserSync({
        server: {
            middleware: [modRewrite(['!\\.\\w+$ /index.html [L]'])]
        },
        port: 8888,
        open: false,
    });
    ngrok.connect(8888, function(error, url) {
        console.log('[ngrok] ' + url);
    });
});

gulp.task('js', function() {
    // gulp
    //     .src(['front/js/_ms.js'])
    //     .pipe(plumber())
    //     .pipe(concat('application.js'))
    //     .pipe(browserify())
    //     .pipe(gulp.dest('front/js/'));
});

gulp.task('sass', function(){
    gulp.src(['./scss/foundation/*.scss', './scss/layout/*.scss', './scss/object/**/*.scss'])
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        .pipe(concat('application.scss'))
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['**/*.html','css/application.css', 'js/application.js', 'parts/*.html'], function(){
        browserSync.reload();
    });
});

gulp.task('default', ['sass', 'connect', 'watch']);
gulp.task('build', ['sass']);