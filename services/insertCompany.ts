import db from '../database/database';

const query = /*sql*/ `
  INSERT INTO Company (name, number) 
  VALUES ($name, $number);
`;

/**
 * Inserts a new company into the DB
 */
export default async function insertCompany($name: string, $number?: string) {
	return await new Promise<boolean>((resolve) => {
		db.run(query, { $name, $number }, (error: Error | null) => {
			if (error) resolve(false);
			resolve(true);
		});
	});
}
