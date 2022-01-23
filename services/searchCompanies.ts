import { Company } from '../types/company';
import db from '../database/database';

const query = /*sql*/ `
  SELECT id, name, number FROM Company WHERE name like
`;

/**
 * Searches companies from the DB
 */
export default async function searchCompanies(
	searchString: string
): Promise<Company[]> {
	return await new Promise((resolve) => {
		db.all(
			query + `'%${searchString}%';`,
			[],
			(error: Error | null, results: Company[]) => {
				if (error) {
					throw error;
				}
				// console.log('Eck', results);
				resolve(results);
			}
		);
	});
}
