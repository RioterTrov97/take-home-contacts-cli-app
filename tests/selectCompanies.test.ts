import selectCompanies from '../services/selectCompanies';

describe('Testing select company records from database', () => {
	it('Can list companies from db', async () => {
		const data = await selectCompanies();
		expect(data).toBeTruthy();
	});
});
