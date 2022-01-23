import insertContacts from '../services/insertContact';
import selectContacts from '../services/selectContacts';

describe('Testing insert contacts in database', () => {
	it('Can insert a new contact in db', async () => {
		const data = await insertContacts('Sam', '123', 2);
		expect(data).toBeTruthy();
		const allContacts = await selectContacts();
		const insertedContact = allContacts.find(
			(contact) => contact.name === 'Sam' && contact.number === '123'
		);
		expect(!!insertedContact).toBeTruthy();
	});
});
