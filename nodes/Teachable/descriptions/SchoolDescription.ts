/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const schoolOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['school'],
			},
		},
		options: [
			{
				name: 'Get Info',
				value: 'getInfo',
				description: 'Get school information',
				action: 'Get school info',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				description: 'Get school statistics',
				action: 'Get school stats',
			},
		],
		default: 'getInfo',
	},
];

export const schoolFields: INodeProperties[] = [
	// School resource has no additional fields - operations work on the authenticated school
];
