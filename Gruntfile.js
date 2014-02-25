module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      foo: {
        src: [
          "src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",
          
        ],
      },
    },
    concat: {
  options: {
    // define a string to put between each file in the concatenated output
    separator: ';'
  },
  dist: {
    // the files to concatenate
    src: ["src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js",],
    // the location of the resulting JS file
    dest: 'build/Controllerinn.js'
  }
},
uglify: {
  options: {
    // the banner is inserted at the top of the output
    banner: '/*! <ChatApp> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'build/chatapp.min.js': ["src/js/*.js",
          "src/js/services/*.js",
          "src/js/directives/*.js",
          "src/js/controllers/*.js"]
    }
  }
}
    /*
       The task to concatenate and minify the code has been removed
       You have to figure that one out yourself :)

       And since the index is referencing the file from that task
       it wont receive your updates until you figure this task out
       or reference the original src/ files
    */
  });

  // Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['jshint','uglify','concat']);
};