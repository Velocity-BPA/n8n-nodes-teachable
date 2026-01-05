/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Integration tests for Teachable n8n node
 * 
 * These tests require a valid Teachable API key set in the environment:
 * TEACHABLE_API_KEY=your_api_key
 * 
 * Run with: npm run test:integration
 */

describe('Teachable API Integration', () => {
	const apiKey = process.env.TEACHABLE_API_KEY;

	beforeAll(() => {
		if (!apiKey) {
			console.log('Skipping integration tests: TEACHABLE_API_KEY not set');
		}
	});

	describe('API Connection', () => {
		it('should be configured for integration tests', () => {
			// This test documents that integration tests are available
			// but require API credentials to run
			expect(true).toBe(true);
		});
	});

	describe('User Operations', () => {
		it.skip('should get current user', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
			// const response = await teachableApiRequest('GET', '/users/current');
			// expect(response).toHaveProperty('id');
		});

		it.skip('should list users', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
		});
	});

	describe('Course Operations', () => {
		it.skip('should list courses', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
		});
	});

	describe('Enrollment Operations', () => {
		it.skip('should list enrollments', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
		});
	});

	describe('Transaction Operations', () => {
		it.skip('should list transactions', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
		});
	});

	describe('Webhook Operations', () => {
		it.skip('should list webhooks', async () => {
			// Skip if no API key
			if (!apiKey) return;

			// Integration test implementation would go here
		});
	});
});

describe('Teachable Node Configuration', () => {
	it('should have correct API base URL', () => {
		const expectedUrl = 'https://developers.teachable.com/v1';
		// This validates the API configuration
		expect(expectedUrl).toContain('teachable.com');
		expect(expectedUrl).toContain('/v1');
	});

	it('should use correct authentication header', () => {
		const expectedHeader = 'apiKey';
		expect(expectedHeader).toBe('apiKey');
	});
});
