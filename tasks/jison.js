/*
 * grunt-jison
 * https://github.com/rsilve/grunt-jison
 *
 * Copyright (c) 2013 Robert silve
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  grunt.registerMultiTask('jison', 'jison parser generator', function() {
	
	var options = this.options({"moduleType": this.data.type || "commonjs"});
	options["module-type"] = options.moduleType;

	this.files.forEach(function(f) {
		
		var src = f.src.shift();
		var dest = f.dest;

		if (!src) {
			grunt.warn('Missing src property.');
			return false;
		}

		if (!dest) {
			grunt.warn('Missing dest property');
			return false;
		}

		options.file = src;
		options.lexfile = f.src.shift();
		options.outfile = dest;

		try {
			json_cli_main(options);
			grunt.log.oklns("generate "+dest);
			return true;
		} catch (e) {
			grunt.warn(e);
			return false;
		}
    }); 
  });

  
};

// functions taken from jison cli.js - to be removed once jison Generator constructor is enhanced

function json_cli_main(opts) {
  var fs = require('fs');
  var path = require('path');

  var raw = fs.readFileSync(path.normalize(opts.file), 'utf8');
  var jsonMode = path.extname(opts.file) === '.json' || opts.json;
  var name = path.basename((opts.outfile||opts.file)).replace(/\..*$/g,'');
  var lex;

  if (opts.lexfile) {
    lex = fs.readFileSync(path.normalize(opts.lexfile), 'utf8');
  }

  fs.writeFileSync(opts.outfile||(name + '.js'), processGrammar(opts, raw, lex, name, jsonMode));
}

function processGrammar (opts, file, lexFile, name, jsonMode) {
  var ebnfParser = require('ebnf-parser');
  var lexParser  = require('lex-parser');
  var cjson      = require('cjson');
  var jison = require('jison');

  var grammar;
  if (jsonMode) {
    grammar = cjson.parse(file);
  } else {
    // otherwise, attempt to parse jison format
    // fallback to JSON
    try {
      grammar = ebnfParser.parse(file);
    } catch (e) {
      try {
        grammar = cjson.parse(file);
      } catch (e2) {
        throw e;
      }
    }
  }

  var settings = grammar.options || {};

  if (opts['parser-type']) settings.type = opts['parser-type'];
  if (lexFile) grammar.lex = lexParser.parse(lexFile);
  settings.debug = opts.debug;
  if (!settings.moduleType) settings.moduleType = opts['module-type'];
  if (!settings.moduleName && name) {
    settings.moduleName = name.replace(/-\w/g,
      function (match){
        return match.charAt(1).toUpperCase();
      });
  }

  var generator = new jison.Generator(grammar, settings);
  return generator.generate(settings);
}
