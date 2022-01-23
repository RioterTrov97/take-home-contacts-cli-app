import menu from '../cli/menu';
import listContacts from '../cli/listContacts';
import listCompanies from '../cli/listCompanies';
import addContact from '../cli/addContact';
import addCompany from '../cli/addCompany';
import search from '../cli/search';

export const ACTION_CHOICE_LIST_CONTACT = '1';
export const ACTION_CHOICE_LIST_COMPANY = '2';
export const ACTION_CHOICE_ADD_CONTACT = '3';
export const ACTION_CHOICE_ADD_COMPANY = '4';
export const ACTION_CHOICE_SEARCH = '5';
export const ACTION_CHOICE_QUIT = 'Q';
export const ACTION_SHOW_MENU = 'show-menu';

/**
 * The `action` function is the primary mechanism by which the application
 * communicates between views and the controller.
 */
export default async function action(action: string) {
	// Useful for debugging
	// console.log('actionHandler', action, value);

	if (action === ACTION_SHOW_MENU) {
		menu();
	} else if (action === ACTION_CHOICE_LIST_CONTACT) {
		await listContacts();
		menu();
	} else if (action === ACTION_CHOICE_LIST_COMPANY) {
		await listCompanies();
		menu();
	} else if (action === ACTION_CHOICE_ADD_CONTACT) {
		await addContact();
		menu();
	} else if (action === ACTION_CHOICE_ADD_COMPANY) {
		await addCompany();
		menu();
	} else if (action === ACTION_CHOICE_SEARCH) {
		await search();
		menu();
	} else if (action === ACTION_CHOICE_QUIT) {
		// Let the user know we are exiting
		console.log('Bye');
	} else {
		console.error('Received an unknown action');
	}
}
