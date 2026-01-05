/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new user',
				action: 'Create a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a user',
				action: 'Delete a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a user by ID',
				action: 'Get a user',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many users',
				action: 'Get many users',
			},
			{
				name: 'Get by Email',
				value: 'getByEmail',
				description: 'Find a user by email',
				action: 'Get user by email',
			},
			{
				name: 'Get Current User',
				value: 'getCurrentUser',
				description: 'Get the authenticated user',
				action: 'Get current user',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a user',
				action: 'Update a user',
			},
		],
		default: 'getAll',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user:create
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		description: 'The email address of the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the user',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'The password for the user',
			},
			{
				displayName: 'Traffic Source',
				name: 'src',
				type: 'string',
				default: '',
				description: 'The traffic source for the user',
			},
			{
				displayName: 'Unsubscribe From Marketing',
				name: 'unsubscribe_from_marketing_emails',
				type: 'boolean',
				default: false,
				description: 'Whether to unsubscribe the user from marketing emails',
			},
		],
	},

	// ----------------------------------
	//         user:get
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the user',
	},

	// ----------------------------------
	//         user:getByEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getByEmail'],
			},
		},
		description: 'The email address to search for',
	},

	// ----------------------------------
	//         user:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'Student',
						value: 'student',
					},
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'Owner',
						value: 'owner',
					},
				],
				default: 'student',
				description: 'Filter by user role',
			},
			{
				displayName: 'Traffic Source',
				name: 'src',
				type: 'string',
				default: '',
				description: 'Filter by traffic source',
			},
		],
	},

	// ----------------------------------
	//         user:update
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		description: 'The ID of the user to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the user',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The email address of the user',
			},
			{
				displayName: 'Traffic Source',
				name: 'src',
				type: 'string',
				default: '',
				description: 'The traffic source for the user',
			},
		],
	},
];
