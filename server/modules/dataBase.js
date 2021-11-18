const Sqlite = require("sqlite");
const Sqlite3 = require("sqlite3");

const dbFilename = "./database.db";

// Enable debug output
Sqlite3.verbose();

module.exports = {
	connect() {
		return Sqlite.open({
			filename: dbFilename,
			driver: Sqlite3.Database,
		}).catch((err) => {
			console.log("DB.connect failed with error:" + err);
		});
	},
};
