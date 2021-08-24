import db from '../database/database.js';

const query = /*sql*/ `
  SELECT name, number FROM Contact;
`;

/**
 * Selects all Contacts from the DB
 */
export default async function selectContacts() {
  return await new Promise((resolve) => {
    db.all(query, [], (error, results) => {
      if (error) {
        throw error;
      }
      console.log('Eck', results);
      resolve(results);
    });
  });
}
