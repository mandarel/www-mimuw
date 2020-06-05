import {createServer} from 'http';
import * as fs from 'fs';
import {promisify} from 'util';


let open = promisify(fs.open);
let write = promisify(fs.write);
let close = promisify(fs.close);


/* ... */


let fd;

open('plik.txt', 'a').then((_fd) => {

    fd = _fd;
    write(fd, 'A z promisami też się może zapisze?\n');

}).then(() => close(fd)).catch((reason) => {
    console.log('Błąd był straszliwy!', reason);
});

async function zapiszCos() {

    let fd = -1;

    try {

        fd = await open('plik3.txt', 'a');
        await write(fd, 'To jeszcze z async/await');
        await close(fd);

    } catch (e) {

        console.log('Jakiś błąd w trakcie zapisywania', e);
        if (fd != -1) {
            await close(fd);
        }
    }
}

fs.open('plik.txt', 'a', (err, fd) => {

    if (err) {
        console.log('Nie udało się otworzyć pliku :(', err);
        return;
    }

    fs.write(fd, 'Kolejny wpis do pliku!\n', (err, written,str) => {
        if (err) {
            console.log('Nie udało się zapisać', err);
        }
        fs.close(fd, () => {});
    });
});

let server = createServer(
    (req, res) => {
        res.write('Ale super!');
        res.end();
    }
);



server.listen(8080);