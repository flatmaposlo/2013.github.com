module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      less: {
        files: ["c/**/*.less"],
        tasks: ["less", "jekyll:compile"]
      },
      lispy: {
        files: ["j/*.ls"],
        tasks: ["lispy", "jekyll:compile"]
      },
      jekyll: {
        files: ["*.html", "_layouts/*.html", "_posts/*", "_includes/*",
                "_config.yml", "j/*.js", "c/*.css", "m/*"],
        tasks: ["jekyll:compile"]
      }
    },
    lint: {
      all: ["j/*.js"]
    },
    lispy: {
      compile: {
        src: ["j/*.ls"],
        dest: "j/app.js",
        uglify: true
      }
    },
    less: {
      compile: {
        files: {
          "c/screen.css": "c/screen.less"
        },
        options: {
          compress: true
        }
      }
    },
    jekyll: {
      compile: {
        src: ".",
        dest: "_site"
      }
    },
    server: {
      port: 1337,
      base: "_site"
    }
  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-jekyll");

  grunt.registerTask("default", "less lispy jekyll");
  grunt.registerTask("run", "less lispy jekyll server watch");

  grunt.registerHelper("lispy", function(src, callback) {
    var data = grunt.file.read(src);
    var result = require("lispyscript")._compile(data, src);
    callback(null, result);
  });

  require("amd-loader");
  grunt.registerMultiTask("lispy", "Compile Lispyscript files", function() {
    var done = this.async();
    var files = grunt.file.expandFiles(this.file.src);
    var data = this.data, file = this.file;
    var process = function(sources, acc) {
      if (sources.length == 0) {
        var min = data.uglify ? grunt.helper("uglify", acc) : acc;
        grunt.file.write(file.dest, min);
        grunt.log.ok("Compiled to " + file.dest);
        if (data.uglify) grunt.helper("min_max_info", min, acc);
        done();
      } else {
        var car = sources[0];
        grunt.log.writeln("Compiling " + car);
        grunt.helper("lispy", car, function(error, result) {
          if (error) {
            grunt.log.error(error);
            done(false);
          } else {
            process(sources.slice(1), acc + result + "\n");
          }
        });
      }
    };
    process(files, "");
  });
};
