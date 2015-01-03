[ ![Codeship Status for theponti/facade-angular](https://codeship.com/projects/740ef6a0-7505-0132-8185-6662d475f668/status?branch=master)](https://codeship.com/projects/55110)

# Facade-Angular

A client-side AngularJS boilerplate solution

## Features

### Build
* Gulp
  This boilerplate uses the version of `Gulp` in the `node_modules` directory so you will not need to have it installed globally.
* Browserify

### Angular
* Angular-Route
* Angular-Resoure
* Angular-Cookies

## Dependencies
* NodeJS
* NPM

## Usage
1. Clone repo
2. Run `npm install && bower install`
3. Run `rm -rf .git && git init` to start fresh with a new Git repo.
4. Run `npm run dev` to start development server, build tasks, and watch tasks.
5. Start Coding

## Features

### Build
* Gulp
  This boilerplate uses the version of `Gulp` in the `node_modules` directory so you will not need to have it installed globally.
* Browserify

### Styles

#### SCSS
SCSS is the preprocessor used, as it is the most common and, from experience, is the most widely supported CSS preprocessor. `node-sass` is used for compiling the `.scss` files so there is no Ruby dependency.

#### Base files
The `/src/styles` directory contains some initial files to assist in helping you get started with building your application. It follows common conventions formulated by the front end development community.

The `main.scss` file is where all `@import` statements live and is the file used by the build-styles to compile the main.css file that is used in the application.

The `mixins.scss` file contains a variety of scss mixins for tackling all of the common vendor prefix issues, such as keyframes, filter, and so on.

The `colors.scss` file is empty and should be where you store the color variables that you will use in your other .scss files.

The `variables.scss` file is where other variables that will be used in your .scss files. It currently contains variables for some basic fonts and the common device breakpoint pixel values.

The `base.scss` file is where the styles for HTML base elements should live, such as changes to `<html>`, `<body>`, and so on.

#### Bootstrap
Currently, Bootstrap is included as an initial helper for jumpstarting your site's development. It is not necessary and can be removed if you don't want it. It is included because it is the most common and therefore is known and understood by the greater number of developers.

### Scripts

#### JSHint
JSHint is used to analyze all .js files within the `/src/scripts` directory.

#### jQuery
jQuery is included as it is a staple for most front end developers. It is only required if you want to use Bootstrap but is not necessary otherwise.

### Testing

#### Karma
  Karma is used for running the JavaScript test suite. The configuarion can be found in the `karma.conf.js` file in the root directory. This boilerplate uses the version of `Karma` in the `node_modules` directory so you will not need to have it installed globally.

#### Jasmine
  Karma uses the Jasmine testing framework. If you would like to use Mocha or some other testing framework, you can remove Jasmie and replace it with the one of your choosing. Just be sure to change the framework configuration in the `karma.conf.js` file as well.

### Other
* Modernizr
* HTML Minification

## Tasks

### `npm run dev`
This task builds the scripts, styles, and html, and it will also begin the development server at port 4000.

### `npm run build`
This task builds the scripts, styles, and html.

### `npm run prod`
This task will build the production, minified versions of the js, css, and html files.

### `npm test`
This task will begin `Karma`.
