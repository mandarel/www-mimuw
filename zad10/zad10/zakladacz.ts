import * as sqlite3 from 'sqlite3';


function zalozBaze() {

    sqlite3.verbose();
/*
    let db = new sqlite3.Database('baza_memow.db');

    db.run('CREATE TABLE memy (id INT, nazwa VARCHAR(255) ,sciezka VARCHAR(255));');
    db.run('CREATE TABLE historia_cen (id INT, data DATETIME, cena INT);');
    db.close();
*/
    let db = new sqlite3.Database('sesje.db');

    db.run('CREATE TABLE sesje (id VARCHAR(255), data DATETIME, cena INT);');

}



//zalozBaze();

function wpiszDane() {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza_memow.db');

    db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (10, "Gold", "https://i.redd.it/h7rplf9jt8y21.png")');     
    db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (9, "Platinum", "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg")');
    db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (8, "Elite", "https://i.imgflip.com/30zz5g.jpg")');
    db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (5, "Convert", "https://miro.medium.com/max/1000/0*JtQzdvYPkPWoPhGL.jpeg")');

    db.close();

    db = new sqlite3.Database('sesje.db');

    db.run('INSERT INTO uzytkownicy (id, nazwa_uzytkownika, haslo) VALUES (1, "user", "1234")');     

    db.close();
}

wpiszDane();
/*
sqlite3.verbose();

//let db = new sqlite3.Database('baza.db');


db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {

    if (err) throw(err);


    for(let {sciezka, liczba} of rows) {

        console.log(sciezka, '->', liczba);

    }

    db.close();

});
*/