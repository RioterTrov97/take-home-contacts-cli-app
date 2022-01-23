import selectContacts from '../services/selectContacts';

describe('Testing select contact records from database', () => {
	it('Can list contacts from db', async () => {
		const data = await selectContacts();
		expect(data).toBeTruthy();
	});
});
