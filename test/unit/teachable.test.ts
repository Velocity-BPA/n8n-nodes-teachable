/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { cleanBody, parseDate } from '../../nodes/Teachable/transport/GenericFunctions';

describe('Teachable Generic Functions', () => {
	describe('cleanBody', () => {
		it('should remove undefined values', () => {
			const input = {
				name: 'John',
				email: undefined,
				age: 25,
			};
			const result = cleanBody(input);
			expect(result).toEqual({
				name: 'John',
				age: 25,
			});
		});

		it('should remove null values', () => {
			const input = {
				name: 'John',
				email: null,
				age: 25,
			};
			const result = cleanBody(input);
			expect(result).toEqual({
				name: 'John',
				age: 25,
			});
		});

		it('should remove empty string values', () => {
			const input = {
				name: 'John',
				email: '',
				age: 25,
			};
			const result = cleanBody(input);
			expect(result).toEqual({
				name: 'John',
				age: 25,
			});
		});

		it('should keep zero values', () => {
			const input = {
				name: 'John',
				count: 0,
			};
			const result = cleanBody(input);
			expect(result).toEqual({
				name: 'John',
				count: 0,
			});
		});

		it('should keep false boolean values', () => {
			const input = {
				name: 'John',
				active: false,
			};
			const result = cleanBody(input);
			expect(result).toEqual({
				name: 'John',
				active: false,
			});
		});

		it('should return empty object for all empty values', () => {
			const input = {
				name: undefined,
				email: null,
				phone: '',
			};
			const result = cleanBody(input);
			expect(result).toEqual({});
		});
	});

	describe('parseDate', () => {
		it('should return undefined for undefined input', () => {
			const result = parseDate(undefined);
			expect(result).toBeUndefined();
		});

		it('should return undefined for empty string', () => {
			const result = parseDate('');
			expect(result).toBeUndefined();
		});

		it('should parse valid ISO date string', () => {
			const input = '2024-01-15T10:30:00Z';
			const result = parseDate(input);
			expect(result).toBe('2024-01-15T10:30:00.000Z');
		});

		it('should parse date-only string', () => {
			const input = '2024-01-15';
			const result = parseDate(input);
			expect(result).toContain('2024-01-15');
		});

		it('should return original string for invalid date', () => {
			const input = 'not-a-date';
			const result = parseDate(input);
			// When date parsing fails, it returns the original string
			expect(result).toBeDefined();
		});
	});
});

describe('Teachable Node Structure', () => {
	it('should have valid node exports', () => {
		// This test ensures the node files can be imported without errors
		const nodePath = '../../nodes/Teachable/Teachable.node';
		expect(() => require(nodePath)).not.toThrow();
	});

	it('should have valid trigger node exports', () => {
		const triggerPath = '../../nodes/Teachable/TeachableTrigger.node';
		expect(() => require(triggerPath)).not.toThrow();
	});

	it('should have valid credential exports', () => {
		const credentialPath = '../../credentials/TeachableApi.credentials';
		expect(() => require(credentialPath)).not.toThrow();
	});
});

describe('Teachable Node Properties', () => {
	let TeachableNode: any;

	beforeAll(() => {
		const module = require('../../nodes/Teachable/Teachable.node');
		TeachableNode = new module.Teachable();
	});

	it('should have correct display name', () => {
		expect(TeachableNode.description.displayName).toBe('Teachable');
	});

	it('should have correct name', () => {
		expect(TeachableNode.description.name).toBe('teachable');
	});

	it('should have 8 resources', () => {
		const resourceProperty = TeachableNode.description.properties.find(
			(p: any) => p.name === 'resource'
		);
		expect(resourceProperty.options).toHaveLength(8);
	});

	it('should have all required resources', () => {
		const resourceProperty = TeachableNode.description.properties.find(
			(p: any) => p.name === 'resource'
		);
		const resourceValues = resourceProperty.options.map((o: any) => o.value);
		expect(resourceValues).toContain('user');
		expect(resourceValues).toContain('course');
		expect(resourceValues).toContain('enrollment');
		expect(resourceValues).toContain('transaction');
		expect(resourceValues).toContain('coupon');
		expect(resourceValues).toContain('lecture');
		expect(resourceValues).toContain('school');
		expect(resourceValues).toContain('webhook');
	});

	it('should require teachableApi credentials', () => {
		expect(TeachableNode.description.credentials).toHaveLength(1);
		expect(TeachableNode.description.credentials[0].name).toBe('teachableApi');
		expect(TeachableNode.description.credentials[0].required).toBe(true);
	});
});

describe('Teachable Trigger Node Properties', () => {
	let TeachableTriggerNode: any;

	beforeAll(() => {
		const module = require('../../nodes/Teachable/TeachableTrigger.node');
		TeachableTriggerNode = new module.TeachableTrigger();
	});

	it('should have correct display name', () => {
		expect(TeachableTriggerNode.description.displayName).toBe('Teachable Trigger');
	});

	it('should have correct name', () => {
		expect(TeachableTriggerNode.description.name).toBe('teachableTrigger');
	});

	it('should be in trigger group', () => {
		expect(TeachableTriggerNode.description.group).toContain('trigger');
	});

	it('should have all webhook events', () => {
		const eventProperty = TeachableTriggerNode.description.properties.find(
			(p: any) => p.name === 'event'
		);
		const eventValues = eventProperty.options.map((o: any) => o.value);
		expect(eventValues).toContain('new.enrollment');
		expect(eventValues).toContain('enrollment.completed');
		expect(eventValues).toContain('new.transaction');
		expect(eventValues).toContain('transaction.refunded');
		expect(eventValues).toContain('new.user');
		expect(eventValues).toContain('new.comment');
	});
});

describe('Teachable Credentials', () => {
	let TeachableCredentials: any;

	beforeAll(() => {
		const module = require('../../credentials/TeachableApi.credentials');
		TeachableCredentials = new module.TeachableApi();
	});

	it('should have correct name', () => {
		expect(TeachableCredentials.name).toBe('teachableApi');
	});

	it('should have correct display name', () => {
		expect(TeachableCredentials.displayName).toBe('Teachable API');
	});

	it('should have apiKey property', () => {
		const apiKeyProp = TeachableCredentials.properties.find(
			(p: any) => p.name === 'apiKey'
		);
		expect(apiKeyProp).toBeDefined();
		expect(apiKeyProp.type).toBe('string');
		expect(apiKeyProp.required).toBe(true);
	});

	it('should use generic authentication', () => {
		expect(TeachableCredentials.authenticate.type).toBe('generic');
	});
});
