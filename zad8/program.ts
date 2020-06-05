import * as sqlite3 from 'sqlite3';
import {createServer} from 'http';
import * as fs from 'fs';

sqlite3.verbose();

let server = createServer(
    (req, res) => {
        if(req.url == "/statystyki"){
            /* wypisz liczbe wyswietlen z bazy */
            let db = new sqlite3.Database('baza.db');
            let response = '<h1>statystyki</h1> <ul>';
            db.all('SELECT sciezka, liczba FROM wyswietlenia;', [], (err, rows) => {
                
                if (err) throw(err);
                for(let {sciezka, liczba} of rows) {
                    response+= '<li>' ;
                    response+=  sciezka ;
                    response+=  '->' ;
                    response+= liczba; 
                    response+=   '</li>';
                    
                }
                response += '</ul>';

                res.write(response);
                res.end();

                db.close();
            
            });

        }else{
            //seems to require this directory 
            fs.readFile('.'+req.url, function(err, data) {
                if(err) throw(err);
                let db = new sqlite3.Database('baza.db');
                db.all('SELECT sciezka, liczba FROM wyswietlenia WHERE sciezka = ?;', [req.url], (err, rows) => {

                    if (err) throw(err);
                    if (rows.length == 0){
                        //console.log("no file recorded, let's add it");
                        db.run(`INSERT INTO wyswietlenia (sciezka, liczba) VALUES(?, ?)`, [req.url, 1], function(err) {
                            if (err) {
                              return console.log(err.message);
                            }
                          });
                    }else if(rows.length == 1){
                        //console.log("one file recorded, let's update it");
                        for(let {sciezka, liczba} of rows) {
                            db.run('UPDATE wyswietlenia SET liczba = ? WHERE sciezka = ?', [liczba+1, sciezka],  function(err, data) {});
                        }
                        
                    }else{
                        console.log("something went wrong, to many files with same name");
                    }
                    db.close();
                
                });
                res.end(data);

            });
        }
        
    }
);

server.listen(8080);