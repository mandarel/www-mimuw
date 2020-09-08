import { measureMemory } from "vm";
//import * as sqlite3 from 'sqlite3';

let wyniki:number[][];

type Pytanie = {
    zadanie:string;
    odpowiedzi:number[];
    kara:number;
    wynik:number;
}

interface ITest{
    id:number;
    nazwa:string;
    wstep:string;
}


var sqlite3 = require('sqlite3');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var path = require('path');
var ejs = require('ejs')
var fs = require('fs')

var app = express();
//app.use(bodyParser());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(session({
    store: new SQLiteStore({dir:'./', db: 'sesje'}),
    secret: "it is a secret",
    cookie: { maxAge: 900000 },
    rolling: false,
    resave: false,
    saveUninitialized: true
})) ;
const port = 3000
let objectSentFromServer = 12
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(!req.session.loggedin){

        res.render('login.ejs');
    }else{
        let quizy;
        let db = new sqlite3.Database('baza_quizow.db');
        db.all('SELECT * FROM quiz;', [], (err, rows) => {
                    
            if (err) throw(err);
            //quizy = JSON.stringify(rows);
            quizy = rows;
            for(let a = 0; a<quizy.length; a++){
                delete(quizy[a].zawartosc); 
            }
            res.render('index.ejs', { quizy: quizy  })
            db.close();
        
        });
        
        
    }
});

app.get('/changepassword', function(req, res) {
    if(req.session.loggedin){
        res.render('changepassword.ejs' );
    }else{
        res.render('login.pug') ;
    }
});
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
let pytania;
let start;
app.get('/quiz/:quizId', function(req, res) {
    let db = new sqlite3.Database('baza_quizow.db');
    let username = req.session.username;
    db.serialize(async => {
        db.all('SELECT * FROM wyniki WHERE username = ? AND id_quizu = ?;', [username, req.params.quizId], (err, rows) => {
                    
            if (err) throw(err);
            //quizy = JSON.stringify(rows);
            if(rows != null && rows.length>0){
                res.redirect('/');
                db.close();

            }  
        });
        db.all('SELECT * FROM quiz WHERE id = ?;', [req.params.quizId], (err2, rows2) => {
            if (err2) throw(err2);
            pytania = rows2;
            start = new Date().getTime();
            res.render('quiz.ejs', { quiz: JSON.stringify(JSON.parse(jsonString ))} );
            db.close();
        });

    });

});
let end;
app.get('/quiz/:quizId/wynik/:wynik', function(req, res) {
    let db = new sqlite3.Database('baza_quizow.db');
    let username = req.session.username;
     db.all('SELECT * FROM quiz WHERE id = ?;', [req.params.quizId], (err2, rows2) => {
            if (err2) throw(err2);
            pytania = JSON.stringify( rows2);
            let time = new Date().getTime() - start;
            /*wyniki = JSON.parse(JSON.parse(JSON.stringify(req.params.wynik)));
            for(let i = 0; i<wyniki.length; i++){
                wyniki[i][1]=time;
            }
            */
           // db.all('INSERT INTO wyniki (username, id_quizu, blob) VALUES (?, ?, ?);' [req.session.username, req.params.quizId, JSON.stringify(wyniki)], (err3, row3) => {
           //     if (err3) throw(err3);
           console.log(req.params.wynik);
                res.render('wynik.ejs', { pytania: JSON.stringify(JSON.parse(jsonString )), wynik: req.params.wynik ,czas: end-start} );

           // });
          //  db.close();
        });

});
app.post('/login', function (req, res) {
    
    let username = req.body.username;
    let password = req.body.password;
    if(username == null || password == null){
        res.render('login.pug', { message: 'niewpisanie uzytkownika lub złe hasło'}) ;
    }else{
        let db = new sqlite3.Database('baza_quizow.db');
        db.all('SELECT nazwa_uzytkownika, haslo FROM uzytkownicy WHERE nazwa_uzytkownika = ?;', [username], (err, rows) => {
                    
            if (err) throw(err);
            if(rows == null || rows.length == 0 || rows.length>1){
                // brak uzytkownika, wyświetl jeszcze raz login.pug
                res.render('login.pug', { message: 'brak uzytkownika lub złe hasło'}) ;
            }
            else{
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            }
            db.close();
        
        });

    }
})

app.post('/changepassword', function (req, res) {
    
    let username = req.session.username;
    let newpassword = req.body.newpassword;
    let newpassword2 = req.body.newpassword2;
    if(newpassword != newpassword2 || newpassword == null){
        res.render('changepassword.pug', { message: 'puste haslo lub hasłą się nie zgadzają'}) ;
    }else{
        let db = new sqlite3.Database('baza_quizow.db');
        db.all('UPDATE uzytkownicy SET haslo = ? WHERE nazwa_uzytkownika = ?;', [newpassword, username], (err, rows) => {
                    
            if (err) throw(err);
            req.session.destroy();
            res.redirect('/');
            db.close();
        
        });
        
    }
})
app.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
    
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))