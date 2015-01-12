"user strict";

module.exports = function( grunt ) {

	grunt.loadNpmTasks( "kouto-swiss" );
	grunt.loadNpmTasks( "grunt-contrib-stylus" );
	grunt.loadNpmTasks( "grunt-contrib-jade" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-notify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );


	grunt.initConfig( {
		"stylus": {
			"styles": {
		      "options": {
		        "compress": false, // - Change value to have lisible CSS
				"use": [
					require("kouto-swiss")
				]
		      },
		      "files": {
		        "bin/css/main.css": "src/styl/main.styl"
		      }
		    }
		},
		"jade": {
			"html": {
				"options": {
					"pretty": false, // - Change value to have lisible HTML
					"data": {
						"debug": false,
					},
				},
				"files": { // - Add jade's fill to compile here
					"bin/index.html": "src/jade/main.jade"
				}
			}
		},
		"uglify": {
			"scripts": {
				"files": {
					"bin/js/script.js": "src/js/script.js"
				}
			}
		},
		"notify_hooks": {
			"options": {
				"enable": true,
				"success": true, // - Change value to see notify only for errors
				"duration": 1
			}
		},
		"watch": {
			"styles": {
				"files": [ "src/styl/**/*.styl" ],
				"tasks": [ "stylus:styles", "notify_hooks" ]
			},
			"html": {
				"files": [ "src/jade/**/*.jade" ],
				"tasks": [ "jade:html", "notify_hooks" ]
			},
			"scripts": {
				"files": [ "src/js/script.js" ],
				"tasks": [ "uglify:scripts", "notify_hooks" ]
			}
		}
	} );

	grunt.registerTask( "work", [
		"jade",
		"stylus",
		"uglify",
		"notify_hooks",
		"watch"
	] );
};
