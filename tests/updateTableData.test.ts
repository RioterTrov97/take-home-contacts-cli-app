import updateTableData from '../services/updateTableData';

describe('Testing update records in database', () => {
	it('Can update company record in db', async () => {
		const data = await updateTableData(3, 'name', 'Googles', 'Company');
		expect(data).toBeTruthy();
	});

	it('Can update contact record in db', async () => {
		const data = await updateTableData(3, 'company_id', 3, 'Contact');
		expect(data).toBeTruthy();
	});

	it('Throws error for invalid column name', async () => {
		const data = await updateTableData(3, 'names', 'Googles', 'Company');
		expect(data).toBeFalsy();
	});
});
