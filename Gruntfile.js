'use strict'

module.exports = function (grunt) {
   // var localConfig;
   // try {
   //  localConfig = require('./server/config/local.env');
   //  } catch(e) {
   //    localConfig = {};
   //  }

  //Initialize grunt tasks
  grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),
    //Set up tasks
    clean: {
      dist: "dist/*"
    },
    concat:{
      options:{
        separator: ';'
      },
      dist:{
        src: ['client/src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify:{
      dist:{
        files: {
          'dist/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      target: {
        files: {
        'dist/style.min.css' : ['client/styles.css', 'client/**/*.css']
        }
      }
    },
    express: {
      options: {
        port: process.env.PORT || 3000
      },
      dev : {
        options: {
          script: './server.js'
        }
      },
      prod: {
        options: {
          script: './server.js',
          node_env: 'production'
        }
      }
    },
    jshint: {
      options: {
        jshintrc :'.jshintrc'
      },
      files: ['client/src/app.js']
    },
    nodemon: {
      dev: {
        script: './server.js'
      }
    },
    open: {
      dev: {
        path: 'http://localhost:3000/',
        server: 'Google Chrome'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: true,
      },
      continuous:{
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
      travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    watch: {
      express: {
        files: ['./server.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
        }
      },
      karma: {
        files: ['test/test.js'],
        tasks: ['karma:continuous:run']
      }
    },
    shell: {
      prodServer: {
        command: 'git push azure master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  });

  //Load Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');

  //Server Development
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
  });

    //Register Unit Tasks
grunt.registerTask('build',[])
  grunt.registerTask('default', ['express:dev', 'watch','karma:continuous:start', 'nodemon']);
  grunt.registerTask('unit-test', ['karma:unit']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('devmode',['karma:continuous','watch']);
}