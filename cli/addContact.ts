import { Contact, ContactInput } from '../types/contact';
import prompt, { RevalidatorSchema } from 'prompt';
import searchContacts from '../services/searchContacts';
import updateTableData from '../services/updateTableData';
import { inputNumberPrompt, inputPrompt } from '../utils/inputPrompt';
import insertContact from '../services/insertContact';
import { shortenedListCompanies } from './listCompanies';

// Prompt library schema for requesting input values
const CONTACT_SCHEMA = [
	{
		name: 'name',
		description: 'Contact Name',
		type: 'string',
		required: true,
	},
	{
		name: 'number',
		description: 'Phone Number',
		type: 'string',
		required: true,
	},
] as RevalidatorSchema[];

/**
 * Requests input from the user for a new contact record or update it
 */
async function addContact() {
	console.clear();
	let continueLoop = true;
	const stopMainLoop = () => (continueLoop = false);
	while (continueLoop) {
		console.log(`Search for existing contact, or blank to add new contact.`);
		const searchInput = await inputPrompt();
		if (!searchInput) {
			await addNewContact();
			break;
		} else {
			await updateDetailsOfContact(searchInput, stopMainLoop);
		}
	}
}

export default addContact;

/**
 * Adds a new contact record
 */
async function addNewContact() {
	const newContact = await prompt.get<ContactInput>(CONTACT_SCHEMA);
	let companyId;
	const companies = await shortenedListCompanies();
	console.log(`\nPlease choose a company, or blank to skip.`);
	while (true) {
		const getCompanyId = await inputNumberPrompt('Company');
		if (!getCompanyId) break;
		const selectedCompany = companies.find(
			(company) => company.id === Number(getCompanyId)
		);
		if (selectedCompany) {
			companyId = Number(selectedCompany.id);
			break;
		} else {
			console.log('Choose correct company id');
		}
	}
	insertContact(newContact.name, newContact.number, companyId);
}

/**
 * Updates company and phoneNumber of the record
 */
async function updateDetailsOfContact(
	searchInput: string,
	stopMainLoop: () => void
) {
	const contacts = await searchContacts(searchInput);
	console.log('\nResults:');
	contacts.forEach((record) => {
		console.log(`${record.id} ${record.name}`);
	});
	console.log(`0 Search Again`);
	console.log(`\nSelect contact to update, or search again.`);
	while (true) {
		const selectedId = await inputPrompt('Contact');
		if (selectedId === '0') break;
		const contact = contacts.find(
			(contact) => contact.id === Number(selectedId)
		);
		if (contact) {
			console.log(
				`\nAdd Phone Number for ${contact.name}, or blank to skip.\n`
			);
			const phoneNumber = await inputNumberPrompt('Phone Number');
			if (phoneNumber)
				updateTableData(
					contact.id,
					'number',
					contact.number + ', ' + phoneNumber,
					'Contact'
				);
			await updateCompanyOfContact(contact);
			stopMainLoop();
			break;
		} else {
			console.log(`Please choose correct contact id.\n`);
		}
	}
}

/**
 * Updates company of the record
 */
async function updateCompanyOfContact(contact: Contact) {
	const companies = await shortenedListCompanies();
	console.log(`\nUpdate Company for ${contact.name}, or blank to skip.`);
	while (true) {
		const companyId = await inputPrompt('Company');
		if (!companyId) break;
		const id = companies.find((company) => company.id === Number(companyId));
		if (id) {
			await updateTableData(contact.id, 'company_id', companyId, 'Contact');
			break;
		} else {
			console.log('Choose correct company id');
		}
	}
}
