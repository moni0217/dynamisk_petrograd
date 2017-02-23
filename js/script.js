window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    produktIndex = 0;
    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}
var produktIndex = 0;

function visProdukt(produkt) {
    //klon produkt_template
    console.log("produkt");
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //if sætning der laver offset på hver anden. Den kan jo også bruges til at lave hver anden blå, f.eks.
    if (produktIndex % 2 == 0) {
        klon.querySelector(".index").classList.add("col-sm-offset-1");
    }

    //indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/imgs/medium/" + produkt.billede + "-md.jpg";

    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
    //tæller én op hver gang, den hr gennemgået et produkt
    produktIndex++;
}
