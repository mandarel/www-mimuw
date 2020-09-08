import * as sqlite3 from 'sqlite3';

let jsonString = {

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
};

let jsonString2 = {

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
};
function zalozBaze() {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza_quizow.db');
    db.serialize(async() => {

        db.run('CREATE TABLE quiz (id INT, nazwa VARCHAR(255), zawartosc TEXT);');
        db.run('CREATE TABLE wyniki (username VARCHAR(255), id_quizu INT, blob TEXT);');
        db.run('CREATE TABLE uzytkownicy (nazwa_uzytkownika VARCHAR(255), haslo VARCHAR(255))')
    
        db.run('INSERT INTO quiz (id, nazwa, zawartosc) VALUES (1, "Test przykładowy", ?)', [JSON.stringify(jsonString)]);     
        db.run('INSERT INTO quiz (id, nazwa, zawartosc) VALUES (2, "Szybkie potęgowanie", ?)', [JSON.stringify(jsonString2)]);  
    
        db.run('INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES ("user1", "user1")');  
        db.run('INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES ("user2", "user2")');  
    
    });
}


zalozBaze();
