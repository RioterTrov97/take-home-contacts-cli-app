import fileSystem from 'fs';
import sqlite3 from 'sqlite3';

/**
 * This is global module that initialises the sqlite3 database and exposes it
 * via the `db` variable.
 */

const dbName = process.env.NODE_ENV === 'test' ? 'test-db' : 'contacts';
const db = new sqlite3.Database(`./database/${dbName}.sqlite3`);

try {
	console.log('Initilalising the DB');
	const schema = fileSystem.readFileSync('./database/schema.sql', 'utf8');
	const queryArr = schema.toString().split(';');
	db.serialize(() => {
		queryArr.forEach((query) => {
			if (!query) return;
			query += ';';
			db.run(query, (err) => {
				if (err) throw err;
			});
		});
	});
} catch (err) {
	console.error(err);
}

export default db;
