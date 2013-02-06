module.exports = function(grunt) {

	var path = require("path");

	grunt.initConfig({
		watch: {
			files: [
				path.join(__dirname,'src','sass','**','*.scss'),
				path.join(__dirname,'src','coffee','**','*.coffee')
			],
			tasks: [
				'compass:dev',
				'coffee'
			]
		},
		coffee: {
			app: {
				src: [path.join(__dirname,'src','coffee','**','*.coffee')],
				dest: path.join(__dirname,'public','js'),
				options: {
					bare: true
				}
			}
		},
		compass: {
			dev: {
				src: path.join(__dirname,'src','sass'),
				dest: path.join(__dirname,'public','css'),
				images: path.join(__dirname,'public','images'),
				linecomments: true,
				forcecompile: true,
				debugsass: true,
				relativeassets: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-coffee');
	grunt.loadNpmTasks('grunt-compass');
	grunt.registerTask('default', 'coffee compass:dev');
};
