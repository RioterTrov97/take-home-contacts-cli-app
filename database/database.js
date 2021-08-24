import fileSystem from 'fs';
import sqlite3 from 'sqlite3';

/**
 * This is global module that initialises the sqlite3 database and exposes it
 * via the `db` variable.
 */

const db = new sqlite3.Database('./database/contacts.sqlite3');

try {
  console.log('Initilalising the DB');
  const sql = fileSystem.readFileSync('./database/schema.sql', 'utf8');

  db.run(sql);
} catch (err) {
  console.error(err);
}

export default db;
