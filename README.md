# grunt-svg2string

> Transforms a SVG file into a JavaScript string

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg2string --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg2string');
```

## The "svg2string" task

### Overview
In your project’s Gruntfile, add a section named `svg2string` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  svg2string: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
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
* `[%= sanitized %]` — sanitized name (eg. `icon_set`);
* `[%= capitalized %]` — sanitized and capitalized name (eg. `ELEMENTS`);
* `[%= ext %]` — extension of the current file (eg. `svg`).
 
See examples of the templates below.

```
(App.SVG = App.SVG || {})["[%= sanitized %]"] = [%= content %];
```

```
App.defaults("App.SVG", {"[%= sanitized %]": [%= content %]});
```

#### options.wrapLines
Type: `Boolean`
Default value: `true`

A boolean value that instructs to wrap long lines or not.

#### options.lineLength
Type: `Number`
Default value: `120`

A numerical value that is used as maximum length of the line of the processed content including quotes and concatenation sign.

Please, bear in mind that this option is not applicable if `wrapLines` is `false`.

#### options.symbols
Type: `String`
Default value: none

A string value that is used as name for group of icons represented as symbols.

All matched SVG files converted to `<symbol>` and joined together into one SVG file. Next, this file processed as usual.

### Usage Examples

Source files:

**icon-set.svg**

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
  <defs>

    <polygon id="icon-arrow-right" points="15,7 11,11 20,20 11,29 15,33 28,20"></polygon>
    <polygon id="icon-arrow-left" points="25,33 29,29 20,20 29,11 25,7 12,20"></polygon>

    <path id="icon-circle-arrow-right" d="M20 10c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-2.8 13.5c-.3.3-.3.8 0 1l1 1c.3.3.7.3 1 0l4.8-5c.3-.3.3-.8 0-1l-4.9-5.1c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.8 0 1l3.4 3.5-3.3 3.6z"></path>
    <path id="icon-circle-arrow-left" d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm2.8 13.5c.3.3.3.8 0 1l-1 1c-.3.3-.7.3-1 0l-4.8-5c-.3-.3-.3-.8 0-1l4.9-5.1c.3-.3.7-.3 1 0l1 1c.3.3.3.8 0 1l-3.4 3.6 3.3 3.5z"></path>

    <path id="icon-play" d="M20 5c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 27c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm-3-6l9-6-9-6v12z"></path>

    <filter id="filter-shadow">
      <feOffset dx="0" dy="1"></feOffset>
      <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        <feColorMatrix type="matrix" values="0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0" result="shadow"></feColorMatrix>
        <feMerge>
          <feMergeNode in="shadow"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>

  </defs>
</svg>
```

**navigation.svg**

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="nav-down" d="M0 1l5 5 5-5-1-1-4 4-4-4-1 1z"></path>
    <path id="nav-up" d="M10 5l-5-5-5 5 1 1 4-4 4 4 1-1z"></path>
  </defs>
</svg>
```

#### Default Options
In this example, the default options are used transform two SVG files into the JavaScript file.

```js
grunt.initConfig({
  svg2string: {
    elements: {
      files: {
        'assets/_/js/elements.js': [
          'assets/images/icon-set.svg',
          'assets/images/navigation.svg'
        ]
      }
    }
  }
});
```

Output file **elements.js**

```js
var SVG_ICON_SET =
'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><polygon id="icon-arrow-right" points="15,7 11,11 '+
'20,20 11,29 15,33 28,20"></polygon><polygon id="icon-arrow-left" points="25,33 29,29 20,20 29,11 25,7 12,20"></polygo'+
'n><path id="icon-circle-arrow-right" d="M20 10c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-2.8 13.5c'+
'-.3.3-.3.8 0 1l1 1c.3.3.7.3 1 0l4.8-5c.3-.3.3-.8 0-1l-4.9-5.1c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.8 0 1l3.4 3.5-3.3 3.6z">'+
'</path><path id="icon-circle-arrow-left" d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm2.8 13'+
'.5c.3.3.3.8 0 1l-1 1c-.3.3-.7.3-1 0l-4.8-5c-.3-.3-.3-.8 0-1l4.9-5.1c.3-.3.7-.3 1 0l1 1c.3.3.3.8 0 1l-3.4 3.6 3.3 3.5z'+
'"></path><path id="icon-play" d="M20 5c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 27c-6.6 0-12-5.4'+
'-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm-3-6l9-6-9-6v12z"></path><filter id="filter-shadow"><feOffset dx="0" d'+
'y="1"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 .75 0, '+
'0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0" result="shadow"></feColorMatrix><feMerge><feMergeNode in="shadow"></feMergeNod'+
'e><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs></svg>';
var SVG_NAVIGATION =
'<svg xmlns="http://www.w3.org/2000/svg"><defs><path id="nav-down" d="M0 1l5 5 5-5-1-1-4 4-4-4-1 1z"></path><path id="'+
'nav-up" d="M10 5l-5-5-5 5 1 1 4-4 4 4 1-1z"></path></defs></svg>';
```

#### Custom Options
In this example, we create custom JavaScript file out of two SVG files using template and no wrap option.

```js
grunt.initConfig({
  svg2string: {
    elements: {
      options: {
        template: '(App.SVG = App.SVG || {})["[%= filename %]"] = [%= content %];',
        wrapLines: false
      },
      files: {
        'assets/_/js/elements.js': [
          'assets/images/icon-set.svg',
          'assets/images/navigation.svg'
        ]
      }
    }
  }
});
```

Output file **elements.js**

```js
(App.SVG = App.SVG || {})["icon-set"] = '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><polygon id="icon-arrow-right" points="15,7 11,11 20,20 11,29 15,33 28,20"></polygon><polygon id="icon-arrow-left" points="25,33 29,29 20,20 29,11 25,7 12,20"></polygon><path id="icon-circle-arrow-right" d="M20 10c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-2.8 13.5c-.3.3-.3.8 0 1l1 1c.3.3.7.3 1 0l4.8-5c.3-.3.3-.8 0-1l-4.9-5.1c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.8 0 1l3.4 3.5-3.3 3.6z"></path><path id="icon-circle-arrow-left" d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm2.8 13.5c.3.3.3.8 0 1l-1 1c-.3.3-.7.3-1 0l-4.8-5c-.3-.3-.3-.8 0-1l4.9-5.1c.3-.3.7-.3 1 0l1 1c.3.3.3.8 0 1l-3.4 3.6 3.3 3.5z"></path><path id="icon-play" d="M20 5c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 27c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm-3-6l9-6-9-6v12z"></path><filter id="filter-shadow"><feOffset dx="0" dy="1"></feOffset><feGaussianBlur stdDeviation="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0" result="shadow"></feColorMatrix><feMerge><feMergeNode in="shadow"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs></svg>';
(App.SVG = App.SVG || {})["navigation"] = '<svg xmlns="http://www.w3.org/2000/svg"><defs><path id="nav-down" d="M0 1l5 5 5-5-1-1-4 4-4-4-1 1z"></path><path id="nav-up" d="M10 5l-5-5-5 5 1 1 4-4 4 4 1-1z"></path></defs></svg>';
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.6 (04-Oct-2014): Fix samples in the documentation
* 0.1.5 (24-Aug-2014): Fix wrong code
* 0.1.4 (24-Aug-2014): Add option to convert set of SVG files into symbols.
* 0.1.3 (12-Aug-2014): Replace multiple continuous space characters with one space.
* 0.1.2 (25-Jul-2014): Introduce sanitized filename in the templates.
* 0.1.1 (24-Jul-2014): Maximum length of the line includes quotes and plus sign now.
* 0.1.0 (24-Jul-2014): Initial release
