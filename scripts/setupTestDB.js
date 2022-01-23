const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');
const colors = require('colors');

console.log('\n**************************************\n'.rainbow);
console.log('1. Test Database Creation Started...'.green);
const dbPath = path.resolve(__dirname, '../', 'database', 'test-db.sqlite3');
console.log('2. Check if old DB is present...'.green);
if (fs.existsSync(dbPath)) {
	fs.unlinkSync(dbPath);
	console.log('   --> Found old DB and deleted it!'.green);
}
const db = new sqlite3.Database(dbPath);

const schemaPath = path.resolve(__dirname, '../', 'database', 'schema.sql');
const testDataPath = path.resolve(__dirname, '../', 'dev', 'test-data.sql');
try {
	const schema = fs.readFileSync(schemaPath);
	const testData = fs.readFileSync(testDataPath);
	const queries = schema.toString() + testData.toString();
	const queryArr = queries.split(';');
	console.log('3. Populating Test Database...'.green);
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
console.log('4. Test Database Creation Completed!!!'.green);
console.log('\n**************************************\n'.rainbow);
