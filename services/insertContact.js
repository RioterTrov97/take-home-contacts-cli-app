import db from '../database/database.js';

const query = /*sql*/ `
  INSERT INTO Contact (name, number) 
  VALUES ($name, $number)
;
`;

/**
 * Inserts a new contact into the DB
 */
export default function insertContact($name, $number) {
  db.run(query, { $name, $number });
}
