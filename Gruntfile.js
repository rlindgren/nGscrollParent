
var srcFile = 'src/scrollParent.js';
var srcFileMin = 'src/scrollParent.min.js';
var distFile = 'dist/scrollParent.js';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'dist/scrollParent.min.js': [srcFile]
        }
      }
    },
    copy: {
      main: {
        files: [{ expand: true, flatten: true, src: [srcFile], dest: 'dist/'}]
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', srcFile, srcFileMin],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bump');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'copy:main']);

  grunt.registerTask('bumper', ['bump-only', 'default', 'bump-commit']);

};