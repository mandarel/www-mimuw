let jsonString: string = `{

    "nazwa": "Test przykładowy",
    "wstep": "Liczyć każdy może",
    "pytania": [
        {
            "zadanie": "2+3",
            "odpowiedzi": [5, 4, 1, 8],
            "kara": 4,
            "wynik": 5
        },
        {
            "zadanie": "2-(-24:4)",
            "odpowiedzi": [8, 14, 15, 123],
            "kara": 10,
            "wynik": 8
        },
        {
            "zadanie": "18*(-24:4)",
            "odpowiedzi": [80, 118, 108, 114],
            "kara": 15,
            "wynik": 108
        },
        {
            "zadanie": "2+2*2",
            "odpowiedzi": [8, 4, 16, 6],
            "kara": 4,
            "wynik": 6
        }
    ]
}`;

let jsonString2: string = `{

    "nazwa": "Szybkie potęgowanie",
    "wstep": "Liczyć każdy może",
    "pytania": [
        {
            "zadanie": "2^2",
            "odpowiedzi": [5, 4, 1, 8],
            "kara": 4,
            "wynik": 4
        },
        {
            "zadanie": "3^9",
            "odpowiedzi": [19683, 19681, 19687, 19689],
            "kara": 12,
            "wynik": 19683
        },
        {
            "zadanie": "15^3",
            "odpowiedzi": [3455, 3375, 3475, 3275],
            "kara": 10,
            "wynik": 3375
        },
        {
            "zadanie": "4^5",
            "odpowiedzi": [256, 512, 1024, 2048],
            "kara": 4,
            "wynik": 1024
        }
    ]
}`;
let wyniki:number[][];

type Pytanie = {
    zadanie:string;
    odpowiedzi:number[];
    kara:number;
    wynik:number;
}

interface ITest{
    nazwa:string;
    wstep:string;
    pytania:Pytanie[];
}

function jestTestem(object: any): object is ITest {
    return object.nazwa !== undefined && object.wstep !== undefined && object.pytania !== undefined && object.wynik!== undefined;
}

let test1 = JSON.parse(jsonString);
let test2 = JSON.parse(jsonString2);
let testy:ITest[] = new Array();;
testy.push(test1);
testy.push(test2);

let testPrzykładowy:ITest;

let nrPytania = 0;
let liczbaPytan = 0;
let wybrane:number[];

let countDownDate:number;
let czasStartPytania = 0;
let czasy:number[];
let numerTimera:number;
function dodajCzas(){
    const w = new Date().getTime();
    czasy[nrPytania-1]+=w-czasStartPytania;
    czasStartPytania=w;
}
function ustaw(){
    document.getElementById("nr_pytania").innerHTML = "" + nrPytania;
    document.getElementById("pytanie").innerHTML = testPrzykładowy.pytania[nrPytania-1].zadanie;
    document.getElementById("odp1").innerHTML = "" + testPrzykładowy.pytania[nrPytania-1].odpowiedzi[0];
    document.getElementById("odp2").innerHTML = "" + testPrzykładowy.pytania[nrPytania-1].odpowiedzi[1];
    document.getElementById("odp3").innerHTML = "" + testPrzykładowy.pytania[nrPytania-1].odpowiedzi[2];
    document.getElementById("odp4").innerHTML = "" + testPrzykładowy.pytania[nrPytania-1].odpowiedzi[3];
    document.getElementById("kara_czas").innerHTML = "" + testPrzykładowy.pytania[nrPytania-1].kara;
    odznaczWszyskie();
    if(wybrane[nrPytania-1] !== 0){
        for(let i = 0; i<4; i++) {
            if(testPrzykładowy.pytania[nrPytania-1].odpowiedzi[i] === wybrane[nrPytania-1]){
                wybierzMnie(i+1);
            }
        }
    }
}
function zacznijQuiz(numer: number){
    testPrzykładowy=testy[numer-1];
    document.getElementById("wynik").className = "znikniety";
    document.getElementById("przeszłe_wyniki").className = "znikniety";
    document.getElementById("zacznij_quizy").className = "znikniety";
    document.getElementById("koniec").className = "nieuruchomionyKoniec";
    document.getElementById("quiz").className = "";
    document.getElementById("wstep").innerHTML = testPrzykładowy.wstep;
    liczbaPytan=testPrzykładowy.pytania.length;
    wybrane = new Array<number>(liczbaPytan);
    czasy = new Array<number>(liczbaPytan);
    for(let i =0; i<liczbaPytan; i++){
        czasy[i]=0;
        wybrane[i]=0;
    }
    countDownDate = new Date().getTime();
    czasStartPytania=countDownDate;
    document.getElementById("liczba_pytan").innerHTML = "" + liczbaPytan;
    nrPytania=1;
    ustaw();
    numerTimera = setInterval(function(){ updateTimer(); }, 30);
}

function nastepny()
{
    if(liczbaPytan > nrPytania)
    {
        dodajCzas();
        nrPytania++;
        ustaw();
    }
}
function cofnij()
{
    if(nrPytania > 1)
    {
        dodajCzas();
        nrPytania--;
        ustaw();
    }
}

function odznaczWszyskie(){
    document.getElementById("odp1").className = "";
    document.getElementById("odp2").className = "";
    document.getElementById("odp3").className = "";
    document.getElementById("odp4").className = "";
}

function wybierzMnie(numer:number){
    document.getElementById("odp"+numer).className = "wybrany";
}

function uruchomKoniec(){
    document.getElementById("koniec").className = "uruchomionyKoniec";
}

function wybrano(numer: number){
    odznaczWszyskie();
    wybierzMnie(numer);
    wybrane[nrPytania-1] = parseInt(document.getElementById("odp"+numer).innerHTML, 10);
    let wszystkie = 1;
    for(const i of wybrane ){
        if(i === 0){
            wszystkie = 0;
        }
    }
    if(wszystkie){
        uruchomKoniec();
    }


}
function zapisz(wyn: number[]){
    document.getElementById("wynik").className = "znikniety";
    if(localStorage.getItem("wyniki") === null){
        wyniki = new Array();
        wyniki.push(wyn);
    }else{
        wyniki = JSON.parse(localStorage.getItem("wyniki"));
        wyniki.push(wyn);
    }
    localStorage.setItem('wyniki', JSON.stringify(wyniki));
    wyswietlWyniki();
}

function zapiszWynik(){
    const wyn = new Array<number>(2);
    wyn[0]=czasy[czasy.length-2];
    wyn[1]=czasy[czasy.length-1];
    zapisz(wyn);
}
function zapiszWynikZeStatystykami(){
    zapisz(czasy);
}

function wyswietlWyniki(){
    document.getElementById("zacznij_quizy").className = "";
    document.getElementById("przeszłe_wyniki").className = "";
    document.getElementById("przeszłe_wyniki").innerHTML = "";
    for(let i = 0; i<wyniki.length; i++){
        const newDiv = document.createElement("li");

        newDiv.innerHTML = "Test wykonany " + new Date(wyniki[i][wyniki[i].length-2]) + " zajął " + wyniki[i][wyniki[i].length-1]/1000;
        document.getElementById("przeszłe_wyniki").appendChild(newDiv);
    }
}
function anuluj(){
    clearInterval(numerTimera);
    document.getElementById("quiz").className = "znikniety";
    document.getElementById("wynik").className = "znikniety";
    document.getElementById("zacznij_quizy").className = "";
    document.getElementById("przeszłe-wyniki").className = "znikniety";
    document.getElementById("koniec").className = "";
}
function zakoncz(){
    if(document.getElementById("koniec").className === "uruchomionyKoniec"){
        dodajCzas();
        clearInterval(numerTimera);
        document.getElementById("quiz").className = "znikniety";
        document.getElementById("wynik").className = "";
        let karaLaczna = 0;
        document.getElementById("wynik_za_odpowiedzi").innerHTML = "";
        for(let i = 0; i<liczbaPytan; i++){
            const newDiv = document.createElement("div");

            if(wybrane[i] === testPrzykładowy.pytania[i].wynik){
                newDiv.innerHTML = "Odp. w pyt. " + (i+1) + " jest +" ;
            }else{
                newDiv.innerHTML = "Odp. w pyt. " + (i+1) + " jest -";
                karaLaczna+=testPrzykładowy.pytania[i].kara;
            }
            newDiv.innerHTML+=" i zajęło " + (czasy[i]/1000).toFixed(3);
            document.getElementById("wynik_za_odpowiedzi").appendChild(newDiv);
        }
        czasy.push(karaLaczna*1000);
        document.getElementById("wynik_kary").innerHTML = "Kara łącznie: " + karaLaczna.toFixed(3) + " s";
        document.getElementById("wynik_laczny").innerHTML = "" + ((czasStartPytania-countDownDate+karaLaczna*1000)/1000).toFixed(3);
        czasy.push(countDownDate);
        czasy.push(czasStartPytania-countDownDate+karaLaczna*1000);
    }
}
function updateTimer(){
    const m = new Date().getTime();
    document.getElementById("timerCaly").innerHTML = "" + ((m - countDownDate)/1000).toFixed(3);
    document.getElementById("timerPytanie").innerHTML = "" + ((m - czasStartPytania + czasy[nrPytania-1])/1000).toFixed(3);
}
