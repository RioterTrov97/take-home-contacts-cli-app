import prompt from 'prompt';
import action, { ACTION_ADD_CONTACT } from '../controllers/controller.js';

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
];

/**
 * CLI Component that request input from the user for a new contact record
 */
async function addContact() {
  console.clear();
  console.log(`Add Contact\n`);

  const newContact = await prompt.get(CONTACT_SCHEMA);

  action(ACTION_ADD_CONTACT, newContact);
}

export default addContact;
