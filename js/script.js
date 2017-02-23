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

    if (produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        //udsolgttekst skal fjernes
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat, rabat-prisen skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }
    //registrér klik på modalknap
    klon.querySelector(".modalknap").addEventListener("click", modalKnapKlik);

    //tilføj produkt id til modalknap
    klon.querySelector(".modalknap").dataset.produkt = produkt.id;

    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
    //tæller én op hver gang, den hr gennemgået et produkt
    produktIndex++;
}

function modalKnapKlik(event) {
    console.log("knapklik", event);

    var produktId = event.target.dataset.produkt;
    console.log("Klik på produkt:", produktId);

    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?", {
        id: produktId
    }, visModalProdukt);

}

function visModalProdukt(produkt) {
    console.log("vis modal for", produkt);


}
