import { ContactFullInfo } from '../types/contact';
import db from '../database/database';

const query = /*sql*/ `
  SELECT Contact.id as id, Contact.name AS name, Contact.number AS number, Company.name AS company_name, Company.number AS company_number 
	FROM Contact LEFT JOIN Company ON Contact.company_id = Company.id;
`;

/**
 * Selects all Contacts from the DB
 */
export default async function selectContacts(): Promise<ContactFullInfo[]> {
	return await new Promise((resolve) => {
		db.all(query, [], (error, results: ContactFullInfo[]) => {
			if (error) {
				throw error;
			}
			//console.log('Eck', results);
			resolve(results);
		});
	});
}
