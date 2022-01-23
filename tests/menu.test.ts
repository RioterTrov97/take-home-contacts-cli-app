import mockStdin from 'mock-stdin';
import { getSelection } from '../cli/menu';

describe('Testing user inputs in menu', () => {
	let stdin: mockStdin.MockSTDIN;

	it('Allows users to enter numbers', async () => {
		stdin = mockStdin.stdin();
		process.nextTick(() => {
			stdin.send('1\r');
		});
		const result = await getSelection();
		expect(result).toContain('1');
	});

	it('Allows users to enter small letters', async () => {
		stdin = mockStdin.stdin();
		process.nextTick(() => {
			stdin.send('q\r');
		});
		const result = await getSelection();
		expect(result).toContain('Q');
	});
});
