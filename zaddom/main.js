var jsonString = "{\n\n    \"nazwa\": \"Test przyk\u0142adowy\",\n    \"wstep\": \"Liczy\u0107\u00A0ka\u017Cdy mo\u017Ce\",\n    \"pytania\": [\n        {\n            \"zadanie\": \"2+3\",\n            \"odpowiedzi\": [5, 4, 1, 8],\n            \"kara\": 4,\n            \"wynik\": 5\n        },\n        {\n            \"zadanie\": \"2-(-24:4)\",\n            \"odpowiedzi\": [8, 14, 15, 123],\n            \"kara\": 10,\n            \"wynik\": 8\n        },\n        {\n            \"zadanie\": \"18*(-24:4)\",\n            \"odpowiedzi\": [80, 118, 108, 114],\n            \"kara\": 15,\n            \"wynik\": 108\n        },\n        {\n            \"zadanie\": \"2+2*2\",\n            \"odpowiedzi\": [8, 4, 16, 6],\n            \"kara\": 4,\n            \"wynik\": 6\n        }\n    ]\n}";
var jsonString2 = "{\n\n    \"nazwa\": \"Szybkie pot\u0119gowanie\",\n    \"wstep\": \"Liczy\u0107\u00A0ka\u017Cdy mo\u017Ce\",\n    \"pytania\": [\n        {\n            \"zadanie\": \"2^2\",\n            \"odpowiedzi\": [5, 4, 1, 8],\n            \"kara\": 4,\n            \"wynik\": 4\n        },\n        {\n            \"zadanie\": \"3^9\",\n            \"odpowiedzi\": [19683, 19681, 19687, 19689],\n            \"kara\": 12,\n            \"wynik\": 19683\n        },\n        {\n            \"zadanie\": \"15^7\",\n            \"odpowiedzi\": [3455, 3375, 3475, 3275],\n            \"kara\": 10,\n            \"wynik\": 3375\n        },\n        {\n            \"zadanie\": \"4^5\",\n            \"odpowiedzi\": [256, 512, 1024, 2048],\n            \"kara\": 4,\n            \"wynik\": 1024\n        }\n    ]\n}";
var wyniki;
function jestTestem(object) {
    return object.nazwa !== undefined && object.wstep !== undefined && object.pytania !== undefined && object.wynik !== undefined;
}
var test1 = JSON.parse(jsonString);
var test2 = JSON.parse(jsonString2);
var testy = new Array();
;
testy.push(test1);
testy.push(test2);
var testPrzykładowy;
var nrPytania = 0;
var liczbaPytan = 0;
var wybrane;
var countDownDate;
var czasStartPytania = 0;
var czasy;
var numerTimera;
function dodajCzas() {
    var w = new Date().getTime();
    czasy[nrPytania - 1] += w - czasStartPytania;
    czasStartPytania = w;
}
function ustaw() {
    document.getElementById("nr_pytania").innerHTML = "" + nrPytania;
    document.getElementById("pytanie").innerHTML = testPrzykładowy.pytania[nrPytania - 1].zadanie;
    document.getElementById("odp1").innerHTML = "" + testPrzykładowy.pytania[nrPytania - 1].odpowiedzi[0];
    document.getElementById("odp2").innerHTML = "" + testPrzykładowy.pytania[nrPytania - 1].odpowiedzi[1];
    document.getElementById("odp3").innerHTML = "" + testPrzykładowy.pytania[nrPytania - 1].odpowiedzi[2];
    document.getElementById("odp4").innerHTML = "" + testPrzykładowy.pytania[nrPytania - 1].odpowiedzi[3];
    document.getElementById("kara_czas").innerHTML = "" + testPrzykładowy.pytania[nrPytania - 1].kara;
    odznaczWszyskie();
    if (wybrane[nrPytania - 1] !== 0) {
        for (var i = 0; i < 4; i++) {
            if (testPrzykładowy.pytania[nrPytania - 1].odpowiedzi[i] === wybrane[nrPytania - 1]) {
                wybierzMnie(i + 1);
            }
        }
    }
}
function zacznijQuiz(numer) {
    testPrzykładowy = testy[numer - 1];
    document.getElementById("wynik").className = "znikniety";
    document.getElementById("przeszłe_wyniki").className = "znikniety";
    document.getElementById("zacznij_quizy").className = "znikniety";
    document.getElementById("koniec").className = "nieuruchomionyKoniec";
    document.getElementById("quiz").className = "";
    document.getElementById("wstep").innerHTML = testPrzykładowy.wstep;
    liczbaPytan = testPrzykładowy.pytania.length;
    wybrane = new Array(liczbaPytan);
    czasy = new Array(liczbaPytan);
    for (var i = 0; i < liczbaPytan; i++) {
        czasy[i] = 0;
        wybrane[i] = 0;
    }
    countDownDate = new Date().getTime();
    czasStartPytania = countDownDate;
    document.getElementById("liczba_pytan").innerHTML = "" + liczbaPytan;
    nrPytania = 1;
    ustaw();
    numerTimera = setInterval(function () { updateTimer(); }, 30);
}
function nastepny() {
    if (liczbaPytan > nrPytania) {
        dodajCzas();
        nrPytania++;
        ustaw();
    }
}
function cofnij() {
    if (nrPytania > 1) {
        dodajCzas();
        nrPytania--;
        ustaw();
    }
}
function odznaczWszyskie() {
    document.getElementById("odp1").className = "";
    document.getElementById("odp2").className = "";
    document.getElementById("odp3").className = "";
    document.getElementById("odp4").className = "";
}
function wybierzMnie(numer) {
    document.getElementById("odp" + numer).className = "wybrany";
}
function uruchomKoniec() {
    document.getElementById("koniec").className = "uruchomionyKoniec";
}
function wybrano(numer) {
    odznaczWszyskie();
    wybierzMnie(numer);
    wybrane[nrPytania - 1] = parseInt(document.getElementById("odp" + numer).innerHTML, 10);
    var wszystkie = 1;
    for (var _i = 0, wybrane_1 = wybrane; _i < wybrane_1.length; _i++) {
        var i = wybrane_1[_i];
        if (i === 0) {
            wszystkie = 0;
        }
    }
    if (wszystkie) {
        uruchomKoniec();
    }
}
function zapisz(wyn) {
    document.getElementById("wynik").className = "znikniety";
    if (localStorage.getItem("wyniki") === null) {
        wyniki = new Array();
        wyniki.push(wyn);
    }
    else {
        wyniki = JSON.parse(localStorage.getItem("wyniki"));
        wyniki.push(wyn);
    }
    localStorage.setItem('wyniki', JSON.stringify(wyniki));
    wyswietlWyniki();
}
function zapiszWynik() {
    var wyn = new Array(2);
    wyn[0] = czasy[czasy.length - 2];
    wyn[1] = czasy[czasy.length - 1];
    zapisz(wyn);
}
function zapiszWynikZeStatystykami() {
    zapisz(czasy);
}
function wyswietlWyniki() {
    document.getElementById("zacznij_quizy").className = "";
    document.getElementById("przeszłe_wyniki").className = "";
    document.getElementById("przeszłe_wyniki").innerHTML = "";
    for (var i = 0; i < wyniki.length; i++) {
        var newDiv = document.createElement("li");
        newDiv.innerHTML = "Test wykonany " + new Date(wyniki[i][wyniki[i].length - 2]) + " zajął " + wyniki[i][wyniki[i].length - 1] / 1000;
        document.getElementById("przeszłe_wyniki").appendChild(newDiv);
    }
}
function anuluj() {
    clearInterval(numerTimera);
    document.getElementById("quiz").className = "znikniety";
    document.getElementById("wynik").className = "znikniety";
    document.getElementById("zacznij_quizy").className = "";
    document.getElementById("przeszłe-wyniki").className = "znikniety";
    document.getElementById("koniec").className = "";
}
function zakoncz() {
    if (document.getElementById("koniec").className === "uruchomionyKoniec") {
        dodajCzas();
        clearInterval(numerTimera);
        document.getElementById("quiz").className = "znikniety";
        document.getElementById("wynik").className = "";
        var karaLaczna = 0;
        document.getElementById("wynik_za_odpowiedzi").innerHTML = "";
        for (var i = 0; i < liczbaPytan; i++) {
            var newDiv = document.createElement("div");
            if (wybrane[i] === testPrzykładowy.pytania[i].wynik) {
                newDiv.innerHTML = "Odp. w pyt. " + (i + 1) + " jest +";
            }
            else {
                newDiv.innerHTML = "Odp. w pyt. " + (i + 1) + " jest -";
                karaLaczna += testPrzykładowy.pytania[i].kara;
            }
            newDiv.innerHTML += " i zajęło " + (czasy[i] / 1000).toFixed(3);
            document.getElementById("wynik_za_odpowiedzi").appendChild(newDiv);
        }
        czasy.push(karaLaczna * 1000);
        document.getElementById("wynik_kary").innerHTML = "Kara łącznie: " + karaLaczna.toFixed(3) + " s";
        document.getElementById("wynik_laczny").innerHTML = "" + ((czasStartPytania - countDownDate + karaLaczna * 1000) / 1000).toFixed(3);
        czasy.push(countDownDate);
        czasy.push(czasStartPytania - countDownDate + karaLaczna * 1000);
    }
}
function updateTimer() {
    var m = new Date().getTime();
    document.getElementById("timerCaly").innerHTML = "" + ((m - countDownDate) / 1000).toFixed(3);
    document.getElementById("timerPytanie").innerHTML = "" + ((m - czasStartPytania + czasy[nrPytania - 1]) / 1000).toFixed(3);
}
