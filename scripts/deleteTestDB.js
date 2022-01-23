const fs = require('fs');
const path = require('path');
const colors = require('colors');

const dbPath = path.resolve(__dirname, '../', 'database', 'test-db.sqlite3');

console.log('\n**************************************\n'.rainbow);
console.log('1. Cleanup Started...'.green);
if (fs.existsSync(dbPath)) {
	fs.unlinkSync(dbPath);
	console.log('2. Test database removed!'.green);
}
console.log('3. Cleanup finished!!!'.green);
console.log('\n**************************************\n'.rainbow);
