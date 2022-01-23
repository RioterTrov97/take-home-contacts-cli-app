import db from '../database/database';
import { Company } from '../types/company';

const query = /*sql*/ `
  SELECT id, name, number FROM Company;
`;

/**
 * Selects all Companies from the DB
 */
export default async function selectCompanies(): Promise<Company[]> {
	return await new Promise((resolve) => {
		db.all(query, [], (error, results: Company[]) => {
			if (error) {
				throw error;
			}
			// console.log('Eck', results);
			resolve(results);
		});
	});
}
