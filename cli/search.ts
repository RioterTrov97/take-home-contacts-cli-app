import { inputPrompt } from '../utils/inputPrompt';
import { searchFullContacts } from '../services/searchContacts';
import searchCompanies from '../services/searchCompanies';
import listCompanies from '../cli/listCompanies';
import listContacts from '../cli/listContacts';

/**
 * Displays an array of contacts and companies
 */
export default async function searchContactsCompanies() {
	console.clear();
	console.log(`Search for a company or contact`);
	const searchInput = await inputPrompt();
	const contacts = await searchFullContacts(searchInput);
	const companies = await searchCompanies(searchInput);
	listCompanies(false, companies);
	listContacts(false, contacts);
	if (!companies.length && !contacts.length) console.log(`\nNo records found`);
}
