import prompt, { RevalidatorSchema } from 'prompt';
import { inputNumberPrompt, inputPrompt } from '../utils/inputPrompt';
import insertCompany from '../services/insertCompany';
import { CompanyInput } from '../types/company';
import searchCompanies from '../services/searchCompanies';
import updateTableData from '../services/updateTableData';

// Prompt library schema for requesting input values
const COMPANY_SCHEMA = [
	{
		name: 'name',
		description: 'Company Name',
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
 * Requests input from the user for a new company record or update record
 */
async function addCompany() {
	console.clear();
	console.log(`Add Company\n`);
	let continueLoop = true;
	const stopMainLoop = () => (continueLoop = false);
	// Not using recusion as it is not best suited for stack based language like nodejs.
	// Though trampoline recursion can help as it trandsforms recusion to behave like while loop,
	// But just leaving while loop here as its easy to implement
	while (continueLoop) {
		console.log(`Search for existing company, or blank to add new company.`);
		const searchInput = await inputPrompt();
		if (!searchInput) {
			await addNewCompany();
			break;
		} else {
			await updateDetailsOfCompany(searchInput, stopMainLoop);
		}
	}
}

export default addCompany;

/**
 * Adds a new company record
 */
async function addNewCompany() {
	try {
		const { name, number } = await prompt.get<CompanyInput>(COMPANY_SCHEMA);
		if (name) insertCompany(name, number);
	} catch (error) {
		console.log(error);
	}
}

/**
 * Updates phoneNumber of the record
 */
async function updateDetailsOfCompany(
	searchInput: string,
	stopMainLoop: () => void
) {
	const companies = await searchCompanies(searchInput);
	console.log('\nResults:');
	companies.forEach((record) => {
		console.log(`${record.id} ${record.name}`);
	});
	console.log(`0 Search Again`);
	console.log(`\nSelect company to update, or search again.`);
	while (true) {
		const selectedId = await inputPrompt('Company');
		if (selectedId === '0') {
			console.clear();
			break;
		}
		const company = companies.find(
			(company) => company.id === Number(selectedId)
		);
		if (company) {
			console.log(
				`\nAdd Phone Number for ${company.name}, or blank to skip.\n`
			);
			const phoneNumber = await inputNumberPrompt('Phone Number');
			if (phoneNumber)
				await updateTableData(
					company.id,
					'number',
					company.number + ', ' + phoneNumber,
					'Company'
				);
			stopMainLoop();
			break;
		} else {
			console.log(`Please choose correct id or search again.\n`);
		}
	}
}
