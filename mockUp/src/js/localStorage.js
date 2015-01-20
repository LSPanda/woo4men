/* Woo4men
*
* Script for my website
*
* Started @ 13/01/2015
*/

( function( $ ) {
    "user strict";

    var tableStorage = {},
    jsonTable,
    nbArticles;

    //- Connection to my account
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

    //- Add articles to my bag
    var ajouterPanierForm = function( cible ) {
		//Look how many item
        var quantite = $( 'input#quantite' ).val();
		//Show how many item
        var nbArticles = $( 'span#nbArticles' ).text();
        var nouveauNb = parseInt( nbArticles ) + 1;
		$( 'span#nbArticles' ).text( nouveauNb );
        //Take information
		var titre = $( cible ).find( 'span#productTitle' ).text();
		var prix = $( cible ).find( '#productPrice' ).text() * quantite;
		var reference = $( cible ).find( '#productReference' ).text()
        var taille = $( cible ).find( '#productTaille' ).text()
		//Cost
		var total = $( 'span#totalPrice' ).text();
		var nouveauTotal = parseInt( total ) + parseInt( prix );
        $('span#totalPrice').text(nouveauTotal);
		//JSON files
        tableStorage.push( {'name':titre, 'prix':prix, 'quantite':quantite,'taille':taille, 'reference':reference} );
        jsonTable = JSON.stringify(tableStorage);
		localStorage.setItem('panier', jsonTable);

        //Put information
		$( '<p itemprop="content"><span id="nbArticles" class="span--spacing"></span>article(s) - <span id="totalPrice" class="span--spacing"></span><span class="span--spacing">€</span></p><a itemprop="url" href="html/panier.html" class="woo4menLink">Commander maintenant</a>' )
			.find( 'span#nbArticles' )
				.text( nouveauNb )
				.end()
			.find( 'span#totalPrice' )
				.text( prix )
				.end()
			.appendTo( 'div.header__panier' );
	};

    $( function() {
        //Login
        $( 'div a#loginMember').click( function() {
			connection( this );
		} );
        //Add article
        $( 'input#addArticle' ).click( function(){
			ajouterPanierForm( this );
		});
        //Check Login
        if( sessionStorage.getItem( 'identifiant' ) ) {
			var identifiant = sessionStorage.getItem( 'identifiant' );
			$( 'div.header__login' )
				.find( 'a.woo4menLink' )
					.text( identifiant )
					.end()
		}
        //Panier
        if( localStorage.getItem( 'panier' ) ) {
			tableStorage = JSON.parse( localStorage.getItem( 'panier' ) );
			var total = 0;
			for( i in tableStorage ) {
				$( 'span#nbArticles' ).text( tableStorage.length );
				total += parseFloat( tableStorage[i].prix );
				$( 'span#totalPrice' ).text( total );
				$( '<p itemprop="content"><span id="nbArticles" class="span--spacing"></span>article(s) - <span id="totalPrice" class="span--spacing"></span><span class="span--spacing">€</span></p><a itemprop="url" href="html/panier.html" class="woo4menLink">Commander maintenant</a>' )
        			.find( 'span#nbArticles' )
        				.text( tableStorage[i].quantite )
        				.end()
        			.find( 'span#totalPrice' )
        				.text( tableStorage[i].prix )
        				.end()
        			.appendTo( 'div.header__panier' );
			}

			if( document.getElementById( 'pagePanier' ) ) {
				for( i in tableStorage ) {
					$( '#pagePanier .nbArticles' ).text( tableStorage.length );
					total += parseFloat( tableStorage[i].prix );
					$( '#pagePanier .total span' ).text( total );
					$('<li><h3></h3><div class="quantite"></div><div class="prix"></div><a href="#" class="delete">Supprimer</a></li>')
						.attr('id',i)
						.find('h3')
							.text(tableStorage[i].name)
							.end()
						.find('.prix')
							.text(tableStorage[i].prix)
							.end()
						.find('.quantite')
							.text(tableStorage[i].quantite)
							.end()
						.appendTo('#pagePanier ul');
				}
			}
		}
    } );

} ) (jQuery);
