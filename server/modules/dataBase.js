const sqlite3 = require("sqlite3").verbose(); //verbose modifier gives additional info for debugging

const DBSOURCE = "db.sqlite"; //stores file name of db

let db = new sqlite3.Database(DBSOURCE, (err) => {
	// this fn is called after initialising db
	if (err) {
		// Cannot open database
		console.error(err.message);
		throw err;
	} else {
		console.log("database opened");
	}
});

module.exports = db; //export the database connection script to be inported in another script
