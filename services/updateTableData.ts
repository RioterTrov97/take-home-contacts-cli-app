import db from '../database/database';

/**
 * Updates a single record in DB
 */
export default async function updateTableData(
	$id: number,
	column: string,
	$value: string | number,
	tableName: string
) {
	const query = `
  UPDATE ${tableName}
  SET ${column} = $value
  WHERE id = $id;
`;
	return await new Promise<boolean>((resolve) => {
		db.run(query, { $id, $value }, (error: Error | null) => {
			// returning boolean for testing purpose
			if (error) resolve(false);
			resolve(true);
		});
	});
}
