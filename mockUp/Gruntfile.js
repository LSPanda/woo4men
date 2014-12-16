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
		        "style": 'nested'
		      },
		      "files": {
		        "bin/css/screen.css": "src/sass/screen.sass"
		      }
		    }
		},
		"jade": {
			"jades": {
				"options": {
					"pretty": false,
					"data": {
						"debug": false,
					},
				},
				"files": {
					"bin/html/index.html": "src/jade/index.jade",
					"bin/html/category-men.html": "src/jade/category-men.jade",
					"bin/html/category-men-chemise.html": "src/jade/category-men-chemise.jade",
					"bin/html/category-men-polo.html": "src/jade/category-men-polo.jade",
					"bin/html/category-men-pull.html": "src/jade/category-men-pull.jade",
					"bin/html/category-women.html": "src/jade/category-women.jade",
					"bin/html/category-women-chemise.html": "src/jade/category-women-chemise.jade",
					"bin/html/category-women-polo.html": "src/jade/category-women-polo.jade",
					"bin/html/category-women-pull.html": "src/jade/category-women-pull.jade",
					"bin/html/product.html": "src/jade/product.jade",
					"bin/html/shop.html": "src/jade/shop.jade",
					"bin/html/contact.html": "src/jade/contact.jade"
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

	grunt.registerTask( "work", [
		"jade",
		"sass",
		"uglify",
		"watch"
	] );
};
