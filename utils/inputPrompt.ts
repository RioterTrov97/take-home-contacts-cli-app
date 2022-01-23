import prompt, { RevalidatorSchema } from 'prompt';

// Prompt library schema for requesting an input value
const getOptionSchema = (desc: string, required: boolean, type: string) =>
	({
		name: 'option',
		description: desc,
		type: type,
		required,
	} as RevalidatorSchema);

/**
 * Prompts user for string input
 */
export async function inputPrompt(inputDesc = 'Search', required = false) {
	const schema = getOptionSchema(inputDesc, required, 'string');
	// Provide a prompt and get the user input
	const { option } = await prompt.get(schema);

	// Return the input value converted to upper case
	return option as string;
}

/**
 * Prompts user for number input
 */
export async function inputNumberPrompt(
	inputDesc = 'Phone Number',
	required = false
) {
	const schema = getOptionSchema(inputDesc, required, 'number');
	// Provide a prompt and get the user input
	const { option } = await prompt.get(schema);

	// Return the input as number
	return option as number;
}
