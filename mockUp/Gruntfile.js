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
				"files": {
					"bin/index.html": "src/jade/index.jade",
					"bin/html/login.html": "src/jade/login.jade",
					"bin/html/category-men.html": "src/jade/category-men.jade",
					"bin/html/category-men-chemise.html": "src/jade/category-men-chemise.jade",
					"bin/html/category-men-polo.html": "src/jade/category-men-polo.jade",
					"bin/html/category-men-pull.html": "src/jade/category-men-pull.jade",
					"bin/html/category-women.html": "src/jade/category-women.jade",
					"bin/html/product.html": "src/jade/product.jade",
					"bin/html/shop.html": "src/jade/shop.jade",
					"bin/html/contact.html": "src/jade/contact.jade",
					"bin/html/panier.html": "src/jade/panier.jade",
					"bin/html/panier-identification.html": "src/jade/panier-identification.jade",
					"bin/html/panier-inscription.html": "src/jade/panier-inscription.jade",
					"bin/html/panier-address.html": "src/jade/panier-address.jade",
					"bin/html/panier-payement.html": "src/jade/panier-payement.jade"
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
