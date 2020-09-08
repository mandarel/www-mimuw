import { measureMemory } from "vm";
//import * as sqlite3 from 'sqlite3';

const most_expensive = [

    {'id': 10,
    
    'name': 'Gold',
    
    'price': 1000,
    
    'url': 'https://i.redd.it/h7rplf9jt8y21.png'},
    
    {'id': 9,
    
    'name': 'Platinum',
    
    'price': 1100,
    
    'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg'},
    
    {'id': 8,
    
    'name': 'Elite',
    
    'price': 1200,
    
    'url': 'https://i.imgflip.com/30zz5g.jpg'}  
]





/*

Napisz obiektowy  kod, który będzie (w pamięci) przechowywał listę memów wraz z historią ich cen, i będzie potrafił zwrócić listę trzech najdroższych memów
Wybierz ładnego mema, który wyświetli się powyżej Meme list
Popraw listę wyświetlanych memów:
    obrazek nie powinien być wielki (możesz zmniejszyć w css)
    powinna się wyświetlać cena

*/
class historyPrice{
    day: string;
    price: number;
}

class meme {
    id: number;
    name: string;
    price: historyPrice[];
    url: string;
    change_price;
}
class most_exp {
    id: number;
    name: string;
    price: number;
    url: string;
}

function change_price(newPrice:number) {
    let p:historyPrice = new historyPrice();
    p.price = newPrice;
    p.day = new Date().toISOString();``
    this.price.push(p);
    this.price.sort((a,b) => new Date(b.day).getTime() - new Date(a.day).getTime());
};

let memesArray:meme[] = [

    {'id': 10,
    
    'name': 'Gold',
    
    'price': [{ 'day': '1920-08-20',
                'price': 1000 }],
    
    'url': 'https://i.redd.it/h7rplf9jt8y21.png',

    'change_price': change_price },
    
    {'id': 9,
    
    'name': 'Platinum',
    
    'price': [{ 'day': '1920-08-20',
                'price': 1100 }],
    
    'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg',

    'change_price': change_price},
    
    {'id': 8,
    
    'name': 'Elite',
    
    'price': [{ 'day': '1920-08-20',
                'price': 1200 },
                { 'day': '1950-08-20',
                'price': 1200 }
            ],
    
    'url': 'https://i.imgflip.com/30zz5g.jpg',

    'change_price': change_price},
    
    {'id': 5,

    'name': 'Convert',

    'price': [{ 'day': '1920-08-20',
                'price': 115 }],

    'url': 'https://miro.medium.com/max/1000/0*JtQzdvYPkPWoPhGL.jpeg',

    'change_price': change_price},
]
    
function giveMostExpensive(mem:meme[]){
    for(let i = 0; i<mem.length; i++){
        mem[0].price.sort((a,b) => new Date(b.day).getTime() - new Date(a.day).getTime());
    }
    mem.sort((a, b) => a.price[0].price - b.price[0].price );
    let mems = mem.slice(mem.length-3);
    
    let answer:most_exp[]=new Array(3);
    for(let i = 0; i<3; i++){
        answer[i] = new most_exp();
        answer[i].id = mems[i].id;
        answer[i].price = mems[i].price[0].price;
        answer[i].name = mems[i].name;
        answer[i].url = mems[i].url;
    }  
    return answer; 
}

/*
    Napisz funkcję get_meme, która zwraca mema z historią jego cen w oparciu o  id
    Napisz szablon w PUG, który wyświetla tablicę (czyli tag HTML table) z historią cen posortowaną od najnowszych do najstarszych

*/

function get_meme(id:number){
    for(let i = 0; i<memesArray.length; i++){
        if(memesArray[i].id==id)
            return memesArray[i];
    }
    return null;
}
var sqlite3 = require('sqlite3');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

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

app.set('view engine', 'pug');


app.get('/', function(req, res) {
    if(!req.session.loggedin){
        res.sendFile('login.html');
    }else{

    
        if(req.session.page_views){
            req.session.page_views++;
        }else{
            req.session.page_views = 1;
        }
        let db = new sqlite3.Database('baza_memow.db');
        db.all('SELECT * FROM memy INNER JOIN historia_cen ON memy.id=historia_cen.id;', [], (err, rows) => {
            
            if (err) throw(err);
            db.close();
        
        });
        
        res.render('index.pug', { title: 'Meme market', message: 'Hello there!', memes: giveMostExpensive(memesArray), page_views: req.session.page_views, csrfToken: req.csrfToken(),   })
    }
});

app.get('/meme/:memeId', function (req, res) {
    if(req.session.page_views){
        req.session.page_views++;
    }else{
        req.session.page_views = 1;
    }
    let meme = get_meme(req.params.memeId);
    meme.price.sort((a,b) => new Date(b.day).getTime() - new Date(a.day).getTime());
    res.render('meme.pug', { meme: meme, csrfToken: req.csrfToken() })
 
 })
 
 app.post('/meme/:memeId', function (req, res) {

    
    let meme = get_meme(req.params.memeId);
    if(meme == null){
        res.render('price.pug', { meme: meme }) 
    }else{
        if(req.session.loggedin){
            let db = new sqlite3.Database('sesje.db');
            let memeId = req.params.memeId;
            let username = req.session.username;
            let price = req.body.price;
            db.all('INSERT into historia_cen (id, data, cena, uzytkownik) values (?, ?, ?, ?);', [memeId, "2020-11-02", price, username], (err, rows) => {
                        
                meme.change_price(price);
                db.close();
                res.render('meme.pug', { meme: meme })
                
            });
        }    
    }
 })
    
app.post('/login', function (req, res) {
    
    let username = req.body.username;
    let password = req.body.password;
    if(username == null || password == null){
        res.render('login.pug', { message: 'niewpisanie uzytkownika lub złe hasło', csrfToken: req.csrfToken() }) ;
    }else{
        let db = new sqlite3.Database('sesje.db');
        db.all('SELECT nazwa_uzytkownika, haslo FROM uzytkownicy WHERE nazwa_uzytkownika = ?;', [username], (err, rows) => {
                    
            if (err) throw(err);
            if(rows == null || rows.length == 0 || rows.length>1){
                // brak uzytkownika, wyświetl jeszcze raz login.pug
                res.render('login.pug', { message: 'brak uzytkownika lub złe hasło', csrfToken: req.csrfToken() }) ;
            }
            else{
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            }
            db.close();
        
        });

        // console.log(req.body.price);
    }
})
app.post('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
    
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))