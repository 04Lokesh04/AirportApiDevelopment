const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database/database-sqlite');

db.all("SELECT * FROM country LIMIT 5;", (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        console.log(rows);
    }
});

db.close();
