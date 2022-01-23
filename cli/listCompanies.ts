import { Company } from 'types/company';
import selectCompanies from '../services/selectCompanies';

/**
 * Displays an array of companies
 */
export default async function listCompanies(
	fetchData: true | false = true,
	companyData?: Company[]
) {
	let companies: Company[];
	if (!fetchData && companyData) {
		companies = companyData;
	} else {
		console.clear();
		console.log(`Company List\n`);
		companies = await selectCompanies();
	}

	companies.forEach((record) => {
		console.log(`Company: ${record.name} (${record.number})`);
	});
}

/**
 * Displays an array of companies with just id and name
 */
export async function shortenedListCompanies(title = 'Company List') {
	const companies = await selectCompanies();
	console.log(`\n${title}`);
	companies.forEach((record) => {
		console.log(`${record.id} ${record.name}`);
	});
	return companies;
}
