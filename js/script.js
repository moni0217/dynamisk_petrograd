window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");
    visProdukt();
}

function visProdukt() {
    //klon produkt_template
    console.log("klon");
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    //idsæt data i klon

    //append klon til .produkt_liste
    console.log("appendes");
    document.querySelector(".produktliste").appendChild(klon);
}
