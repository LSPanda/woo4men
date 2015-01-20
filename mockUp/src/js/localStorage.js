/* Woo4men
*
* Script for my website
*
* Started @ 13/01/2015
*/

( function( $ ) {
    "user strict";

    var connection = function( cible ) {
		if( !sessionStorage.getItem( 'identifiant' ) ) {
            var identifiant = $( 'input#mailConnection' ).val();

            sessionStorage.setItem( 'identifiant', identifiant );
    		$( '<div class="header__login">Bienvenue,<a itemprop="url" href="login.html" class="woo4menLink"></a></div>' )
				.find( 'a' )
					.text(identifiant)
					.end()
		}
	}

    $( function() {
        //Call my function here
        if( sessionStorage.getItem( 'identifiant' ) ) {
			var identifiant = sessionStorage.getItem( 'identifiant' );
            console.log( identifiant );
			$( 'div.header__login' )
				.find( 'a.woo4menLink' )
					.text( identifiant )
					.end()
		}

        $( 'div a#loginMember').click( function() {
			connection( this );
            //Rediriger vers la page d'accueil

		} );
    } );

} ) (jQuery);
