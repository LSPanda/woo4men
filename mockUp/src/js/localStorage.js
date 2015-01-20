/* Woo4men
*
* Script for my website
*
* Started @ 13/01/2015
*/

( function( $ ) {
    "user strict";

    var product,
    productPanier = $( "h3.titleHard" ),
    addProductLink = $( "input.form__submit" );

    function stockProductData() {
        var productDetails = {};
        //Stock information
        productDetails.img          = "../css/images/mockUp/chemise.png";
        productDetails.alt          = "Image de chemise";
        productDetails.title        = "Chemise";
        productDetails.price        = "25,00 €";
        productDetails.info         = "Chemise homme";
        productDetails.taille       = "M";
        productDetails.reference    = "13432453";

        //Store my information
        localStorage.setItem( "product", JSON.stringify( productDetails ) );

        addProductLink.click( function() {
            product = JSON.parse( localStorage.getItem( "product" ) );
            fillsMyPanier()
        } );
    }

    function fillsMyPanier() {
        var myPanier = $( "tr.fillMyPanier" )
        //Remplir le panier
        myPanier.html( "<td class=\"table__data--img panier__image\">
                            <img src=" + product.img + " alt=" + product.alt + ">
                        </td>
                        <td class=\"table__data--detail panier__details\">
                            <h5 class=\"delta\">" + product.title + "</h5>
                            <p>" + product.info + "</p>
                            <p>Taille :<span class=\"span--spacing\">" + product.taille + "</span></p>
                            <p>Référence de l'article :<span class=\"span--spacing\"> <a href=\"product.html\" class=\"woo4menLink\">" + product.reference + "</a></span></p>
                        </td>
                        <td class=\"table__data--total panier__number\">
                            <form action=\"#\">
                                <div class=\"inline-block\">
                                    <input type=\"number\" value=\"1\" class=\"forms__input--pattern size__input\">
                                </div></form></td>
                        <td class=\"table__data--price panier__price\">
                            " + product.price + "
                            <span class=\"data__price--delete\"><a href=\"#\" class=\"woo4menLink\">Supprimer</a></span>
                        </td>" );

    }

    $( function() {
        //Call my function here
        stockProductData();
    } );

} ) (jQuery);
