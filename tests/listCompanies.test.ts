import listCompanies, { shortenedListCompanies } from '../cli/listCompanies';

describe('Testing list companies function', () => {
	const log = jest.spyOn(global.console, 'log').mockImplementation();

	it('Lists by searching companies when no args', async () => {
		await listCompanies();
		expect(log).toHaveBeenCalledWith(`Company List\n`);
	});

	it('Lists inputs when args present', async () => {
		await listCompanies(false, [{ id: 1, name: 'Test', number: '123' }]);
		expect(log).toHaveBeenCalledWith('Company: Test (123)');
	});

	it('Can display shortened list by searching companies when no args', async () => {
		await shortenedListCompanies();
		expect(log).toHaveBeenCalledWith(`\nCompany List`);
	});
});
