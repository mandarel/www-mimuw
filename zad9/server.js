const express = require('express');
const app = express();

app.set('view engine', 'pug');
//app.set('views', './views');

app.get('/', function(req, res) {

    res.render('index', { title: 'Meme market', message: 'Hello there!', memes: most_expensive })

});

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });