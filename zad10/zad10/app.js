//import * as sqlite3 from 'sqlite3';
const most_expensive = [
    { 'id': 10,
        'name': 'Gold',
        'price': 1000,
        'url': 'https://i.redd.it/h7rplf9jt8y21.png' },
    { 'id': 9,
        'name': 'Platinum',
        'price': 1100,
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg' },
    { 'id': 8,
        'name': 'Elite',
        'price': 1200,
        'url': 'https://i.imgflip.com/30zz5g.jpg' }
];
/*

Napisz obiektowy  kod, który będzie (w pamięci) przechowywał listę memów wraz z historią ich cen, i będzie potrafił zwrócić listę trzech najdroższych memów
Wybierz ładnego mema, który wyświetli się powyżej Meme list
Popraw listę wyświetlanych memów:
    obrazek nie powinien być wielki (możesz zmniejszyć w css)
    powinna się wyświetlać cena

*/
class historyPrice {
}
class meme {
}
class most_exp {
}
function change_price(newPrice) {
    let p = new historyPrice();
    p.price = newPrice;
    p.day = new Date().toISOString();
    ``;
    this.price.push(p);
    this.price.sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());
}
;
let memesArray = [
    { 'id': 10,
        'name': 'Gold',
        'price': [{ 'day': '1920-08-20',
                'price': 1000 }],
        'url': 'https://i.redd.it/h7rplf9jt8y21.png',
        'change_price': change_price },
    { 'id': 9,
        'name': 'Platinum',
        'price': [{ 'day': '1920-08-20',
                'price': 1100 }],
        'url': 'http://www.quickmeme.com/img/90/90d3d6f6d527a64001b79f4e13bc61912842d4a5876d17c1f011ee519d69b469.jpg',
        'change_price': change_price },
    { 'id': 8,
        'name': 'Elite',
        'price': [{ 'day': '1920-08-20',
                'price': 1200 },
            { 'day': '1950-08-20',
                'price': 1200 }
        ],
        'url': 'https://i.imgflip.com/30zz5g.jpg',
        'change_price': change_price },
    { 'id': 5,
        'name': 'Convert',
        'price': [{ 'day': '1920-08-20',
                'price': 115 }],
        'url': 'https://miro.medium.com/max/1000/0*JtQzdvYPkPWoPhGL.jpeg',
        'change_price': change_price },
];
function giveMostExpensive(mem) {
    for (let i = 0; i < mem.length; i++) {
        mem[0].price.sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());
    }
    mem.sort((a, b) => a.price[0].price - b.price[0].price);
    let mems = mem.slice(mem.length - 3);
    let answer = new Array(3);
    for (let i = 0; i < 3; i++) {
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
function get_meme(id) {
    for (let i = 0; i < memesArray.length; i++) {
        if (memesArray[i].id == id)
            return memesArray[i];
    }
    return null;
}
var sqlite3 = require('sqlite3');
var express = require('express');
var csurf = require('csurf');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
    store: new SQLiteStore({ dir: './', db: 'sesje' }),
    secret: "it is a secret",
    cookie: { maxAge: 900000 },
    rolling: false,
    resave: false,
}));
app.use(csurf());
const port = 3000;
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
    }
    else {
        req.session.page_views = 1;
    }
    let db = new sqlite3.Database('baza_memow.db');
    db.all('SELECT nazwa FROM memy;', [], (err, rows) => {
        if (err)
            throw (err);
        db.close();
    });
    res.render('index.pug', { title: 'Meme market', message: 'Hello there!', memes: giveMostExpensive(memesArray), page_views: req.session.page_views, });
});
app.get('/meme/:memeId', function (req, res) {
    let meme = get_meme(req.params.memeId);
    meme.price.sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());
    res.render('meme.pug', { meme: meme, csrfToken: req.csrfToken() });
});
app.use(express.urlencoded({
    extended: true
}));
app.post('/meme/:memeId', function (req, res) {
    let meme = get_meme(req.params.memeId);
    if (meme == null) {
        res.render('price.pug', { meme: meme });
    }
    else {
        let price = req.body.price;
        // console.log(req.params.memeId)
        meme.change_price(price);
        // console.log(req.body.price);
        res.render('meme.pug', { meme: meme });
    }
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
