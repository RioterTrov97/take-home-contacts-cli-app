import insertCompany from '../services/insertCompany';
import selectCompanies from '../services/selectCompanies';

describe('Testing insert contacts in database', () => {
	it('Can insert a new contact in db', async () => {
		const data = await insertCompany('Dart', '235623');
		expect(data).toBeTruthy();
		const allCompanies = await selectCompanies();
		const insertedCompany = allCompanies.find(
			(company) => company.name === 'Dart' && company.number === '235623'
		);
		expect(!!insertedCompany).toBeTruthy();
	});
});
