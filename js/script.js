window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    produktIndex = 0;
    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    document.querySelector(".filter_vegetar").addEventListener("click", filtrerVegetar);
    document.querySelector(".filter_ikkevegetar").addEventListener("click", filtrerIkkeVegetar);
    document.querySelector(".filter_alkohol").addEventListener("click", filtrerAlkohol);
    document.querySelector(".filter_rabat").addEventListener("click", filtrerTilbud);
}

function filtrerVegetar(event) {
    console.log("klik på vegetar-filter");

    //find alle ikke-vegetarprodukter
    var liste = document.querySelectorAll(".produkt:not(.vegetar)");

    //skjul dem - tilføj klassen 'hide'
    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault;
}


function filtrerIkkeVegetar(event) {
    console.log("klik på ikke-vegetar-filter");

    //find alle vegetarprodukter
    var liste = document.querySelectorAll(".produkt:not(.ikke-vegetar)");

    //skjul dem - tilføj klassen 'hide'
    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault;
}

function filtrerAlkohol(event) {
    console.log("klik på alkohol-filter");

    //find alle ikke-alkohol produkter
    var liste = document.querySelectorAll(".produkt:not(.alkohol)");

    //skjul dem - tilføj klassen 'hide'
    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault;
}

function filtrerTilbud(event) {
    console.log("klik på tilbud-filter");

    //find alle ikke-tilbud produkter
    var liste = document.querySelectorAll(".produkt:not(.tilbud)");

    //skjul dem - tilføj klassen 'hide'
    liste.forEach(div => div.classList.toggle("hide"));

    event.preventDefault;
}


function visProduktListe(listen) {
    console.table(listen);

    //filtrer udsolgte produkter fra
    // listen = listen.filter(produkt => !produkt.udsolgt);

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

    //add'er en vegetar class til alle retter der er vegetaregnede
    if (produkt.vegetar == true) {
        klon.querySelector(".produkt").classList.add("vegetar");
    }
    //add'er en tilbuds class til alle retter der er på tilbud
    if (produkt.rabatsats > 0) {
        klon.querySelector(".produkt").classList.add("tilbud");
    }

    if (produkt.alkoholprocent > 0) {
        klon.querySelector(".produkt").classList.add("alkohol");
    }

    if (produkt.vegetar == false) {
        klon.querySelector(".produkt").classList.add("ikke-vegetar");
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


    //append klon til forskellige lister
    if (produkt.kategori == "forretter") {
        document.querySelector(".forretliste").appendChild(klon);
    } else if (produkt.kategori == "hovedretter") {
        document.querySelector(".hovedretliste").appendChild(klon);
    } else if (produkt.kategori == "desserter") {
        document.querySelector(".dessertliste").appendChild(klon);
    } else if (produkt.kategori == "drikkevarer") {
        document.querySelector(".drikkevareliste").appendChild(klon);
    } else if (produkt.kategori == "sideorders") {
        document.querySelector(".sideorderliste").appendChild(klon);
    }



    //append klon til .produkt_liste
    //    document.querySelector(".produktliste").appendChild(klon);

    //tæller én op hver gang, den har gennemgået et produkt
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

    //find modal_template
    var klon = document.querySelector("#modal_template").content.cloneNode(true);

    //put data i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_billede").src = "/imgs/medium/" + produkt.billede + "-md.jpg";
    klon.querySelector(".data_lang_beskrivelse").innerHTML = produkt.langbeskrivelse;


    //sletter det der stod i modal-content
    document.querySelector(".modal-content").innerHTML = "";

    //append klon i modal-content
    document.querySelector(".modal-content").appendChild(klon);
}
