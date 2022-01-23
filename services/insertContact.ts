import db from '../database/database';

const query = /*sql*/ `
  INSERT INTO Contact (name, number, company_id) 
  VALUES ($name, $number, $companyId)
;
`;

/**
 * Inserts a new contact into the DB
 */
export default async function insertContact(
	$name: string,
	$number?: string,
	$companyId?: number
) {
	return await new Promise<boolean>((resolve) => {
		db.run(query, { $name, $number, $companyId }, (error: Error | null) => {
			if (error) resolve(false);
			resolve(true);
		});
	});
}
