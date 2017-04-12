var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var useref       = require('gulp-useref');
var purify       = require('gulp-purifycss');
var cssnano      = require('gulp-cssnano');
var uglify       = require('gulp-uglify');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');

var fs           = require('file-system');
var http         = require('http');
var http2        = require('spdy');
var express      = require('express');
var compression  = require('compression');

var serveStatic  = require('serve-static');
var runSequence  = require('run-sequence');
var del          = require('del');

require('dotenv').config();

var sslCrt = "";
var sslKey = "";

fs.open('./.env', 'r', (err) => {
    if (err || sslCrt.length != 0) {
        if (err.code === 'ENOENT' && sslCrt.length == 0 ) {
            console.log('.env file not found \n this is used to serve localhost over https \n but isnt nessessary for development');
        }
        if (sslCrt.length != 0) {
            console.log('It is better to put environment variables in a .env file');
        }
    } else {
        fs.readFile('./.env', 'utf8', (err, data) => {
            if( data.indexOf('SSL_CRT_PATH') < 0 || data.indexOf('SSL_KEY_PATH') < 0 || sslCrt.length != 0 ){
                if(data.indexOf('SSL_CRT_PATH') < 0 ){
                    console.log("no 'SSL_CRT_PATH' found in .env file");
                }
                if(data.indexOf('SSL_KEY_PATH') < 0 ){
                    console.log("no 'SSL_KEY_PATH' found in .env file");
                }
            } else {
                sslCrt = process.env.HOME + process.env.SSL_CRT_PATH.toString();
                sslKey = process.env.HOME + process.env.SSL_KEY_PATH.toString();
            }
        })
    }
});

// https server with gzip and http2 (only if cert and key exist)

gulp.task('https-server', function(){

    if(sslKey.length && sslCrt.length){

        var privateKey  = fs.readFileSync(sslKey, 'utf8');
        var certificate = fs.readFileSync(sslCrt, 'utf8');
        var credentials = {key: privateKey, cert: certificate};

        var app = express();
        app.use(compression())
        app.use(serveStatic('./dist', {
            'extensions': ['html'],
            'maxAge': 3600000
        }))
        var httpsServer = http2.createServer(credentials, app);
        httpsServer.listen(8889);
        console.log("https://localhost:8889")

    } else {
        console.log("https://localhost only available when cert and keys are found");
    }
})

// http server with gzip

gulp.task('http-server', function(){
    var app = express();
    app.use(compression())
    app.use(serveStatic('./dist', {
        'extensions': ['html'],
        'maxAge': 3600000
    }))
    var httpsServer = http.createServer(app);
    httpsServer.listen(8888);
    console.log("http://localhost:8888")
})

// debug server

gulp.task('debug-server', function(){
    var app = express();
    app.use(serveStatic('./src', {
        'extensions': ['html'],
        'maxAge': 3600000
    }))
    var httpsServer = http.createServer(app);
    httpsServer.listen(8887);
    console.log("debug server http://localhost:8887")
})

// minify + uglify css, js and html
// optimize images
// copy all to dest

gulp.task('minify-uglify-optimize', function() {
  return gulp.src('src/**/*')
    .pipe(useref())
    .pipe(gulpIf('*.html', htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.+(png|jpg|jpeg|gif|svg)', cache(imagemin({
      interlaced: true,
    }))))
    .pipe(gulp.dest('dist'))
})

// purify global css against all html and js

gulp.task('purify-css', function() {
  return gulp.src('dist/assets/css/*.css')
    .pipe(purify(['dist/**/*.js', 'dist/**/*.html']))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
})

// Cleaning

gulp.task('clean', function() {
  return del.sync('dist');
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/assets/images', '!dist/assets/images/**/*']);
});

// Build

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'minify-uglify-optimize',
    'purify-css',
    callback
  )
})

// Watch

gulp.task('watch', function() {
    gulp.watch('src/**/*.+(html|css|js)', ['build']);
})

// Gulp - Build + Watch + start-servers

gulp.task('default', function(callback) {
  runSequence(
    'build',
    'watch',
    'debug-server',
    'http-server',
    'https-server',
    callback
  )
})

/* TODO

    1. Browser refresh on save

*/
