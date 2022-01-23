const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const colors = require('colors');

const dbPath = path.resolve(__dirname, '../', 'database', 'contacts.sqlite3');

console.log('\n**************************************\n'.rainbow);
console.log('1. Checking if dev DB present...'.green);
if (fs.existsSync(dbPath)) {
	console.log('2. Dev DB found and removing...'.green);
	fs.unlinkSync(dbPath);
	console.log('3. Dev DB removed'.green);
} else {
	console.log('2. Dev DB not found'.green);
	console.log('3. Creating dev DB now...'.green);
}

/**
 * This is global module that initialises the sqlite3 database and exposes it
 * via the `db` variable.
 */
const db = new sqlite3.Database(dbPath);

const schemaPath = path.resolve(__dirname, '../', 'database', 'schema.sql');
const testDataPath = path.resolve(__dirname, '../', 'dev', 'test-data.sql');
try {
	console.log('4. Dev Database Creation Started...'.green);
	const schema = fs.readFileSync(schemaPath);
	const testData = fs.readFileSync(testDataPath);
	const queries = schema.toString() + testData.toString();
	const queryArr = queries.split(';');
	console.log('5. Populating Dev Database...'.green);
	db.serialize(() => {
		queryArr.forEach((query) => {
			if (!query || query.length < 5) return;
			query += ';';
			db.run(query, (err) => {
				if (err) throw err;
			});
		});
	});
} catch (err) {
	console.error(err);
}

db.close();
console.log('6. Dev Database Creation Completed!!!'.green);
console.log('\n**************************************\n'.rainbow);
