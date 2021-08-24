import db from '../database/database.js';

import menu from '../cli/menu.js';
import listContacts from '../cli/listContacts.js';
import addContact from '../cli/addContact.js';

import insertContact from '../services/insertContact.js';
import selectContacts from '../services/selectContacts.js';

export const ACTION_CHOICE_LIST = '1';
export const ACTION_CHOICE_ADD = '2';
export const ACTION_CHOICE_QUIT = 'Q';

export const ACTION_ADD_CONTACT = 'add-contact';
export const ACTION_SHOW_MENU = 'show-menu';

/**
 * The `action` function is the primary mechanism by which the application
 * communicates between views and the controller.
 */
export default async function action(action, value) {
  // Useful for debugging
  // console.log('actionHandler', action, value);

  if (action === ACTION_SHOW_MENU) {
    menu();
  } else if (action === ACTION_CHOICE_LIST) {
    const contacts = await selectContacts();
    listContacts(contacts);
    menu();
  } else if (action === ACTION_CHOICE_ADD) {
    addContact();
  } else if (action === ACTION_ADD_CONTACT) {
    insertContact(value.name, value.number);
    menu();
  } else if (action === ACTION_CHOICE_QUIT) {
    // Let the user know we are exiting
    console.log('Bye');
  } else {
    console.error('Received an unknown action');
  }
}
