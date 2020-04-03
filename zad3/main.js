var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function zaloguj() {
    var komunikaty = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        komunikaty[_i] = arguments[_i];
    }
    console.log.apply(console, __spreadArrays(["Ależ skomplikowany program!"], komunikaty));
}
zaloguj("Ja", "cię", "nie", "mogę");
var jsonString = "{\n\n\n\n    \"lotniska\": {\n\n        \"WAW\": [\"Warszawa\", [3690, 2800]],\n\n        \"NRT\": [\"Narita\", [4000, 2500]],\n\n        \"BQH\": [\"Biggin Hill\", [1802, 792]],\n\n        \"LBG\": [\"Paris-Le Bourget\", [2665, 3000, 1845]]\n\n    }\n\n}";
function jestLiniaLotnicza(object) {
    return object.piloci != undefined && object.lotniska != undefined;
}
var daneLiniiLotniczej = JSON.parse(jsonString);
if (jestLiniaLotnicza(daneLiniiLotniczej)) {
    var juzNaPewnoDaneLinii = daneLiniiLotniczej;
    var dataStructure = JSON.parse(jsonString);
    console.log(dataStructure);
    console.log(dataStructure.piloci.length);
}
else {
    console.log("Zły typ danycj JSON");
}
/* DOM */
var el = document.querySelector("input[type=submit]");
el.setAttribute("style", "display:none;");
var el2 = document.querySelector("input[name=imie]");
var imie = el2.getAttribute("value");
console.log(imie);
var nowyElement = document.createElement("div");
nowyElement.innerHTML = "Jestem divem stworzonym w TS";
nowyElement.setAttribute("style", "font-size:20px; font-weight: 100; color:blue;");
document.body.appendChild(nowyElement);
/* timeout */
setTimeout(function () {
    console.log("No już wreszcie.");
}, 2000);
//# sourceMappingURL=main.js.map