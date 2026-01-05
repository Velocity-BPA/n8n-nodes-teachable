/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const courseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['course'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get course details',
				action: 'Get a course',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many courses',
				action: 'Get many courses',
			},
			{
				name: 'Get Curriculum',
				value: 'getCurriculum',
				description: 'Get course curriculum',
				action: 'Get course curriculum',
			},
			{
				name: 'Get Students',
				value: 'getStudents',
				description: 'List students enrolled in a course',
				action: 'Get course students',
			},
		],
		default: 'getAll',
	},
];

export const courseFields: INodeProperties[] = [
	// ----------------------------------
	//         course:get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['get', 'getCurriculum', 'getStudents'],
			},
		},
		description: 'The ID of the course',
	},

	// ----------------------------------
	//         course:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['course'],
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
				resource: ['course'],
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
				resource: ['course'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Is Published',
				name: 'is_published',
				type: 'boolean',
				default: true,
				description: 'Whether to filter by published status',
			},
		],
	},

	// ----------------------------------
	//         course:getStudents
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['course'],
				operation: ['getStudents'],
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
				resource: ['course'],
				operation: ['getStudents'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
];
