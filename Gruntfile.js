/*global module*/

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'js/**/*.js',
                dest : 'build/js/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
              // Task-specific options go here. 
            },
            all: {
                src: ["css/*.css"],
                dest: "build/css/table-app.min.css"
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/UI/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['jshint']);

};