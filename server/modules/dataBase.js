const sqlite3 = require("sqlite3").verbose(); //verbose modifier gives additional info for debugging
const bcrypt = require("bcrypt");

const DBSOURCE = "db.sqlite"; //stores file name of db

let db = new sqlite3.Database(DBSOURCE, (err) => {
	// this fn is called after initialising db
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		db.run(
			`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
			(err) => {
				if (err) {
					// Table already created
				} else {
					console.log("Table Created!");
				}
			}
		);
	}
});

module.exports = db; //export the database connection script to be inported in another script
