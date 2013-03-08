module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      less: {
        files: ["c/**/*.less"],
        tasks: ["less", "jekyll:compile"]
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
    connect: {
      server: {
        options: {
          port: 1337,
          base: "_site"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-jekyll");

  grunt.registerTask("default", ["less", "jekyll"]);
  grunt.registerTask("run", ["less", "jekyll", "connect", "watch"]);

};
