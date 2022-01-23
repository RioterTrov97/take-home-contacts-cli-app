// Sync object
const config = {
	verbose: true,
	bail: true,
	clearMocks: true,
	coverageProvider: 'v8',
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
};
export default config;
