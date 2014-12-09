"user strict";

module.exports = function( grunt ) {

	grunt.loadNpmTasks( "grunt-contrib-sass" );
	grunt.loadNpmTasks( "grunt-contrib-jade" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );


	grunt.initConfig( {
		"sass": {
			"styles": {
		      "options": {
		        "style": 'compressed'
		      },
		      "files": {
		        "bin/css/screen.css": "src/sass/screen.sass"
		      }
		    }
		},
		"jade": {
			"jades": {
				"options": {
					"pretty": true,
					"data": {
						"debug": false,
					},
				},
				"files": {
					"bin/index.html": "src/jade/index.jade"
				}
			}
		},
		"uglify": {
			"scripts": {
				"files": {
					"bin/js/script.min.js": "src/js/script.js"
				}
			}
		},
		"watch": {
			"styles": {
				"files": [ "src/sass/**/*.sass" ],
				"tasks": [ "sass:styles" ]
			},
			"jades": {
				"files": [ "src/jade/**/*.jade" ],
				"tasks": [ "jade:jades" ]
			},
			"scripts": {
				"files": [ "src/js/script.js" ],
				"tasks": [ "uglify:scripts" ]
			}
		}
	} );

	grunt.registerTask( "build", [
		"jade",
		"sass",
		"uglify"
	] );
};
