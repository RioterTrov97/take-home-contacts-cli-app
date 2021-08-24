import action from '../controllers/controller.js';
import prompt from 'prompt';

// The menu content
const MENU = `
Choose option:

1   List Contacts
2   Add Contact
Q   Quit
`;

// Prompt library schema for requesting an input value
const OPTION_SCHEMA = {
  name: 'option',
  description: 'Choose Option?',
  type: 'string',
  required: true,
  pattern: /^[12Qq]$/,
};

/**
 * Initiate the CLI prompt and returns the validated input value
 */
async function getSelection() {
  // Provide a prompt and get the user input
  const { option } = await prompt.get(OPTION_SCHEMA);

  // Return the input value converted to upper case
  return option.toUpperCase();
}

/**
 * CLI Component that displays the menu and get the user selection
 */
export default async function menu() {
  // Display the CLI menu
  console.log(MENU);

  // Get the users menu selection
  const selection = await getSelection();

  // Notify the controller of the action
  action(selection);
}
