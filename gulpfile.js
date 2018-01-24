'use strict'

// Development versions are default
global.isProd = false

// Current working directory
let cwd = process.cwd()

let runSequence = require('run-sequence')
const axios = require('axios')
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

gulp.task('eslint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return (
    gulp.src(['src/**/*.js', '!node_modules/**', '!src/scripts/templates.js'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError())
  )
})

gulp.task('scripts', ['eslint'], function () {
  return (
    browserify({
      entries: [files.scripts.main],
      debug: !global.isProd,
      insertGlobals: true,
      transform: ngannotate
    })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulpif(global.isProd, streamify(uglify())))
      .pipe(gulp.dest(files.scripts.build))
  )
})

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

gulp.task('views', function () {
  gulp
    .src('src/index.html')
    .pipe(minifyHTML({
      comments: !global.isProd,
      spare: !global.isProd,
      empty: true
    }))
    .pipe(gulp.dest(files.html.build))

  return (
    gulp
      .src('./src/views/**/*.html')
      .pipe(templateCache({ standalone: true }))
      .pipe(gulp.dest('./build/scripts'))
  )
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

gulp.task('cameras', function (next) {
  let fs = require('fs')
  let parser = require('xml2json')

  axios
    .get('https://www.tfl.gov.uk/cdn/static/cms/documents/camera-list.xml')
    .then(function (response) {
      // let camerasXML = fs.readFileSync('./tflcameras.xml')
      let camerasJSON = JSON.parse(parser.toJson(response.data))
      let cameras = {
        cameras: camerasJSON.syndicatedFeed.cameraList.camera.map(function (c) {
          return Object.assign({}, c, { file: '0000' + c.id + '.jpg' })
        })
      }
      fs.writeFileSync('./build/cameras.json', JSON.stringify(cameras))
    })

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
