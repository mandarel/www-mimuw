function zaloguj(...komunikaty: string[]) {

    console.log("Ależ skomplikowany program!", ...komunikaty);

}


zaloguj("Ja", "cię", "nie", "mogę");

let jsonString: string = `{



    "lotniska": {

        "WAW": ["Warszawa", [3690, 2800]],

        "NRT": ["Narita", [4000, 2500]],

        "BQH": ["Biggin Hill", [1802, 792]],

        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]

    }

}`;

type Pilot = {
    name:string;
}
interface ILotnisko{
    sign:string;
    opis:[string, Array<number>];
}

interface ILiniaLotnicza{
    piloci:Array<Pilot>;
    lotniska:Array<ILotnisko>;
}


function jestLiniaLotnicza(object: any): object is ILiniaLotnicza {
    return object.piloci != undefined && object.lotniska != undefined;
}

let daneLiniiLotniczej = JSON.parse(jsonString);

if(jestLiniaLotnicza(daneLiniiLotniczej)) {

    let juzNaPewnoDaneLinii = daneLiniiLotniczej;
    let dataStructure: ILiniaLotnicza = JSON.parse(jsonString);
    console.log(dataStructure);
    console.log(dataStructure.piloci.length);
}else{
    console.log("Zły typ danycj JSON");
}

/* DOM */

let el = document.querySelector("input[type=submit]");

el.setAttribute("style", "display:none;");

let el2 = document.querySelector("input[name=imie]") as HTMLInputElement;
let imie = el2.getAttribute("value");
console.log(imie);

let nowyElement = document.createElement("div");
nowyElement.innerHTML = "Jestem divem stworzonym w TS";
nowyElement.setAttribute("style", "font-size:20px; font-weight: 100; color:blue;")
document.body.appendChild(nowyElement);

/* timeout */

setTimeout(() => {

    console.log("No już wreszcie.");
  
  }, 2000);
