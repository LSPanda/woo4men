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
		sessionStorage.setItem('panier', jsonTable);

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
        $( 'input#addArticle' ).click( function( e ){
			e.preventDefault();
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
        if( sessionStorage.getItem( 'panier' ) ) {
			tableStorage = JSON.parse( sessionStorage.getItem( 'panier' ) );
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

			if( document.getElementById( 'myPanier' ) ) {
				for( i in tableStorage ) {
					$( 'span#panierTotalArticle' ).text( tableStorage.length );
					total += parseFloat( tableStorage[i].prix );
					$( 'span#panierTotal' ).text( total );
					$('<td class="table__data--img panier__image">
                            <img src=""../css/images/mockUp/chemise.png">
                        </td>
                        <td class="table__data--detail panier__details">
                            <h5 id="titleArticle" class="delta"></h5>
                            <p>Taille :<span id="tailleArticle" class="span--spacing"></span></p>
                            <p>Référence de l\'article :<span class="span--spacing"> <a id="referenceArticle" href="product.html" class="woo4menLink"></a></span></p>
                        </td>
                        <td class="table__data--total panier__number">
                            <form action="#">
                                <div class="inline-block">
                                    <input type="number" value="1" class="forms__input--pattern size__input">
                                </div></form></td>
                        <td id="priceArticle" class="table__data--price panier__price">
                            <span class="data__price--delete"><a href="#" class="woo4menLink">Supprimer</a></span>
                        </td>')
						.find( 'h5#titleArticle' )
							.text(tableStorage[i].name)
							.end()
						.find( 'span#tailleArticle' )
							.text(tableStorage[i].taille)
							.end()
						.find( 'a#referenceArticle' )
							.text(tableStorage[i].reference)
							.end()
						.find('td#priceArticle')
							.text(tableStorage[i].prix)
							.end()
						.appendTo('tr#rowArticle');
				}
			}
		}
    } );

} ) (jQuery);
