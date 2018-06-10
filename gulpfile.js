'use strict'

// Development versions are default
global.isProd = false

// Current working directory
let cwd = process.cwd()

let runSequence = require('run-sequence')
const path = require('path')

// Gulp & Plugins
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()

let gulpif = $.if
let uglify = $.uglify
let streamify = $.streamify
let minifyHTML = $.minifyHtml
let templateCache = $.angularTemplatecache

// Styles
let sass = require('gulp-sass')
let minifycss = require('gulp-minify-css')

// Scripts
let eslint = require('gulp-eslint')
let browserify = require('browserify')
let source = require('vinyl-source-stream')
let ngannotate = require('browserify-ngannotate')

// Testing
let karma = require('karma')
let protractor = require('gulp-protractor').protractor
let webdriver = require('gulp-protractor').webdriver
let webdriverUpdate = require('gulp-protractor').webdriver_update

// Dev Server
const serve = require('serve')

gulp.task('webdriver-update', webdriverUpdate)
gulp.task('webdriver', webdriver)

let files = {
  scripts: {
    main: './src/scripts/main.js',
    source: 'src/scripts/**/*.js',
    build: 'build/scripts'
  },
  styles: {
    main: './src/styles/main.scss',
    source: 'src/styles/**/*.scss',
    build: 'build/styles'
  },
  html: {
    source: 'src/**/*.html',
    build: 'build/'
  }
}

gulp.task('styles', function () {
  return gulp.src(files.styles.main)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      // sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(gulpif(global.isProd, minifycss()))
    .pipe(gulp.dest(files.styles.build))
})

gulp.task('test', function (done) {
  return karma.server.start({
    configFile: cwd + '/karma.conf.js'
  }, done)
})

gulp.task('protractor', ['webdriver-update', 'webdriver'], function () {
  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
      configFile: './protractor.conf.js'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err
    })
})

gulp.task('watch', function () {
  gulp.watch(files.html.source, ['views'])
  gulp.watch(files.scripts.source, ['scripts'])
  return gulp.watch(files.styles.source, ['styles'])
})

gulp.task('server', function (next) {
  serve(path.resolve(__dirname, 'build'), { port: 3000 })

  return next()
})

gulp.task('prod', function () {
  global.isProd = true
  return runSequence('views', 'styles', 'scripts')
})

gulp.task('build', function () {
  return runSequence('views', 'styles', 'scripts')
})

gulp.task('default', function () {
  return runSequence('build', 'watch', 'server')
})
