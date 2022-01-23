import { Contact, ContactFullInfo } from '../types/contact';
import db from '../database/database';

const query = /*sql*/ `
  SELECT id, name, number FROM Contact WHERE name like
`;

/**
 * Searches contacts from the DB
 */
export default async function searchContacts(
	searchString: string
): Promise<Contact[]> {
	return await new Promise((resolve) => {
		db.all(
			query + `'%${searchString}%';`,
			[],
			(error: Error | null, results: Contact[]) => {
				if (error) {
					throw error;
				}
				// console.log('Eck', results);
				resolve(results);
			}
		);
	});
}

const fullQuery = `
	SELECT Contact.id as id, Contact.name AS name, Contact.number AS number, Company.name AS company_name, Company.number AS company_number 
	FROM Contact LEFT JOIN Company ON Contact.company_id = Company.id
	WHERE Contact.name like
`;
/**
 * Searches contacts from the DB along with companies and lists full details
 */
export async function searchFullContacts(
	searchString: string
): Promise<ContactFullInfo[]> {
	return await new Promise((resolve) => {
		db.all(
			fullQuery + `'%${searchString}%';`,
			[],
			(error: Error | null, results: ContactFullInfo[]) => {
				if (error) {
					throw error;
				}
				// console.log('Eck', results);
				resolve(results);
			}
		);
	});
}
