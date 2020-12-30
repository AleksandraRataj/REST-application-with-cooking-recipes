const path = require("path"); //aby połączyć fragmenty ściażki aplikacji
// Update with your config settings.

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: './dev.sqlite3'
    },
    migrations: {
        directory: path.join(__dirname, 'src', 'migrations'),
    },
    //__dirname - aktualny katalog w którym sie znajduje
};