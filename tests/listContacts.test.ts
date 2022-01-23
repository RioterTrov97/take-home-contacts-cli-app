import listContacts from '../cli/listContacts';

describe('Testing list contacts function', () => {
	const log = jest.spyOn(global.console, 'log').mockImplementation();

	it('Lists by searching contacts when no args', async () => {
		await listContacts();
		expect(log).toHaveBeenCalledWith(`Contact List\n`);
	});

	it('Lists inputs when args present', async () => {
		await listContacts(false, [
			{
				id: 1,
				name: 'Test',
				number: '123',
				company_name: 'Test',
				company_number: '234',
			},
		]);
		expect(log).toHaveBeenCalledWith('Contact: Test (123) - Test (234)');
	});
});
