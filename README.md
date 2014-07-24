# grunt-svg2string

> Transform a SVG file to a JavaScript string

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg2string --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg2string');
```

## The "svg2string" task

### Overview
In your project's Gruntfile, add a section named `svg2string` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  svg2string: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.template
Type: `String`
Default value: `'var SVG_[%= capitalized %] =\n[%= content %];'`

A string value that is used as a template for JavaScript file. You can use following placeholders inside the template:

* `[%= content %]` — processed content;
* `[%= filepath %]` — path and file name of the current file (eg. `test/fixtures/elements.svg`);
* `[%= filename %]` — name of the current file (eg. `elements`);
* `[%= capitalized %]` — capitalized name (eg. `ELEMENTS`);
* `[%= ext %]` — extention of the current file (eg. `svg`).
 
Please, find some useful templates below.

```
App.defaults("App.SVG", {"[%= filename %]": [%= content %]});
```

```
(App.SVG = App.SVG || {})["[%= filename %]"] = [%= content %];
```

#### options.wrapLines
Type: `Boolean`
Default value: `true`

A boolean value that instucts to wrap long lines or not.

#### options.lineLength
Type: `Number`
Default value: `117`

A numerical value that is used as maximum length of the processed content excluding quotes and concatination sign.

Please, bear in mind that this option is not applicable if `wrapLines` is `false`.

### Usage Examples

#### Default Options
In this example, the default options are used transform two SVG files into the JavaScript file.

```js
grunt.initConfig({
  svg2string: {
    files: {
      'assets/_/js/elements.js': [
        'assets/images/icon-set.svg',
        'assets/images/navigation.svg'
      ],
    },
  },
});
```

#### Custom Options
In this example, I want to bundle two SVG files using custom template and no wrap.

```js
grunt.initConfig({
  svg2string: {
    options: {
      template: '(App.SVG = App.SVG || {})["[%= filename %]"] = [%= content %];',
      wrapLines: false
    },
    files: {
      'assets/_/js/elements.js': [
        'assets/images/icon-set.svg',
        'assets/images/navigation.svg'
      ],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**0.1.0** (24-Jul-2014) Initial release
