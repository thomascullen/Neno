module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'css/styling.css': 'sass/styling.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['sass']);
}
