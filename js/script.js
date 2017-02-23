window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);


    visProdukt();
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    //klon produkt_template
    console.log("produkt");
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    //idsæt data i klon

    //append klon til .produkt_liste
    console.log("appendes");
    document.querySelector(".produktliste").appendChild(klon);
}
