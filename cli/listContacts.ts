import { ContactFullInfo } from '../types/contact';
import selectContacts from '../services/selectContacts';
/**
 * Displays an array of contacts
 */
export default async function listContacts(
	fetchData: true | false = true,
	companyData?: ContactFullInfo[]
) {
	let contacts;
	if (!fetchData && companyData) {
		contacts = companyData;
	} else {
		console.clear();
		console.log(`Contact List\n`);
		contacts = await selectContacts();
	}
	contacts.forEach((record) => {
		console.log(
			`Contact: ${record.name} (${record.number}) - ${
				record.company_name
					? record.company_name + ` (${record.company_number})`
					: 'N/A'
			}`
		);
	});
}
