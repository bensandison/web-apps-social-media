var sqlite3 = require("sqlite3").verbose(); //verbose modifier gives additional info for debugging
var md5 = require("md5"); //used for hashing stored passwords
//TODO: update to bcrypt for better security

const DBSOURCE = "db.sqlite"; //stores file name of db

let db = new sqlite3.Database(DBSOURCE, (err) => {
	// this fn is called after initialising db
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log("Connected to the SQLite database.");
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
					// Table just created now, creating some rows:
					var insert =
						"INSERT INTO user (name, email, password) VALUES (?,?,?)";
					db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
					db.run(insert, ["user", "user@example.com", md5("user123456")]);
				}
			}
		);
	}
});

module.exports = db; //export the database connection script to be inported in another script
