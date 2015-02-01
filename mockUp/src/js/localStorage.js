/* Woo4men
*
* Script for my website
*
* Started @ 13/01/2015
*/

( function( $ ) {
    "user strict";

    var tableStorage = new Array(),
    jsonTable,
    nbArticles,
    total,
    prixTotal;

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
		var titre = $( 'span#productTitle' ).text();
		var img = "../css/images/mockUp/chemise1.png";
		var prix = $( 'span#productPrice' ).text();
		var reference = $( 'dd#productReference' ).text();
        var taille = $( 'span#productTaille' ).text();
		//JSON files
        tableStorage.push( { 'name': titre, 'image': img, 'prix': prix, 'quantite': quantite,'taille': taille, 'reference': reference, 'prixTotal': prixTotal } );
        jsonTable = JSON.stringify( tableStorage );
		localStorage.setItem( 'panier', jsonTable );
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
        if( localStorage.getItem( 'panier' ) ) {
			tableStorage = JSON.parse( localStorage.getItem( 'panier' ) );
			var prixTotal = tableStorage.length * 25;
            console.log( tableStorage.titre );
            $( 'div.header__panier' )
    			.find( 'span#nbArticles' )
    				.text( tableStorage.length )
    				.end()
    			.find( 'span#totalPrice' )
    				.text( prixTotal )
    				.end()

			if( document.getElementById( 'myPanier' ) ) {
                tableStorage = JSON.parse( localStorage.getItem( 'panier' ) );

				for( i in tableStorage ) {
					$( 'span#panierTotalArticle' ).text( tableStorage.length );
					$( 'td#panierPrix' ).text( tableStorage.length * 25 + " €");
					$( 'td#panierTotal' ).text( tableStorage.length * 25 + 6 + " €" );

					$('<tr id="rowArticle" class="table__row--border">
                            <td class="table__data--img panier__image">
                                <img src="../css/images/mockUp/chemise.png">
                            </td>
                            <td class="table__data--detail panier__details">
                                <h5 id="titleArticle" class="delta"></h5>
                                <p>Taille :<span id="tailleArticle" class="span--spacing"></span></p>
                                <p>Référence de l\'article :<span class="span--spacing"> <a id="referenceArticle" href="product.html" class="woo4menLink"></a></span></p>
                                <span class="data__price--delete"><a id="deleteItem" href="#" class="woo4menLink">Supprimer</a></span>
                            </td>
                            <td class="table__data--total panier__number">
                                <form action="#">
                                    <div class="inline-block">
                                        <input type="number" value="1" class="forms__input--pattern size__input">
                                    </div></form></td>
                            <td id="priceArticle" class="table__data--price panier__price">
                            </td>
                        </tr>')
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
							.text(tableStorage[i].prix + "€")
							.end()
						.appendTo('tbody#listPanier');
				}
			}
		}
    } );

} ) (jQuery);
