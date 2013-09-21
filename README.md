# grunt-jison

> grunt plugin for jison parser

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jison --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jison');
```

## The "jison" task

### Overview
In your project's Gruntfile, add a section named `jison` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jison: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.moduleType
Type: `String`
Default value: `commonjs`

The type of module you want to generate with Jison.   
Possible values are `commonjs`, `js` and `amd`.


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  jison: {
    options: {},
    files: {
      'generated-parser.js': 'grammar-file.jison,
    },
  },
})
```

#### Custom Options
In this example, we generate a AMD module instead of a standard JS file.

```js
grunt.initConfig({
  jison: {
    options: {
      moduleType: 'amd'
    },
    files: {
      'generated-parser.amd.js': 'grammar-file.jison,
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
