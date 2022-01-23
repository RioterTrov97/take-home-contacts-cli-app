import searchContacts, { searchFullContacts } from '../services/searchContacts';
import searchCompanies from '../services/searchCompanies';

describe('Testing search results from database', () => {
	it('Can search for companies in db', async () => {
		const result = await searchCompanies('AwayCo');
		const hasAwayCo = result.find((company) => company.name === 'AwayCo');
		expect(hasAwayCo).toBeTruthy();
	});

	it('Can search for contact details in db and get multiple results', async () => {
		const result = await searchContacts('Bill');
		const hasThreeResults = result.length === 3;
		expect(hasThreeResults).toBeTruthy();
	});

	it('Can search for full contacts details in db', async () => {
		const result = await searchFullContacts('s');
		const hasFullData = result[0].name && result[0].company_name;
		expect(hasFullData).toBeTruthy();
	});
});
