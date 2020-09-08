import * as sqlite3 from 'sqlite3';


function zalozBaze() {

    sqlite3.verbose();

    let db = new sqlite3.Database('baza_memow.db');
    db.serialize(async() => {
        db.run('CREATE TABLE memy (id INT, nazwa VARCHAR(255) ,sciezka VARCHAR(255));');
        db.run('CREATE TABLE historia_cen (id INT, data DATETIME, cena INT, uzytkownik VARCHAR(255));');
        db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (10, "Gold", "https://i.redd.it/h7rplf9jt8y21.png")');     
        db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (9, "Platinum", "http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg")');
        db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (8, "Elite", "https://i.imgflip.com/30zz5g.jpg")');
        db.run('INSERT INTO memy (id, nazwa, sciezka) VALUES (5, "Convert", "https://miro.medium.com/max/1000/0*JtQzdvYPkPWoPhGL.jpeg")');


        db.run('INSERT INTO historia_cen (id, data, cena, uzytkownik) VALUES (5, "2020-10-05", 1000, "user")');
        db.run('INSERT INTO historia_cen (id, data, cena, uzytkownik) VALUES (9, "2020-10-05", 1100, "user")');
        db.run('INSERT INTO historia_cen (id, data, cena, uzytkownik) VALUES (8, "2020-10-05", 900, "user")');
        db.run('INSERT INTO historia_cen (id, data, cena, uzytkownik) VALUES (10, "2020-10-05", 1050, "user")');
    });
    db.close();
    

    db = new sqlite3.Database('sesje.db');
    db.serialize(async() => {
        db.run('CREATE TABLE sesje (id VARCHAR(255), data DATETIME, cena INT);');
        db.run('CREATE TABLE uzytkownicy (nazwa_uzytkownika VARCHAR(255), haslo VARCHAR(255))')
    
        db.run('INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES ("user", "1234")');     

    });
    
}



zalozBaze();
