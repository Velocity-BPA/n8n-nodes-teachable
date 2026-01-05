/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const lectureOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lecture'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get lecture details',
				action: 'Get a lecture',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many lectures for a course',
				action: 'Get many lectures',
			},
			{
				name: 'Get Progress',
				value: 'getProgress',
				description: 'Get lecture completion status for a user',
				action: 'Get lecture progress',
			},
			{
				name: 'Update Progress',
				value: 'updateProgress',
				description: 'Mark lecture as complete or incomplete',
				action: 'Update lecture progress',
			},
		],
		default: 'getAll',
	},
];

export const lectureFields: INodeProperties[] = [
	// ----------------------------------
	//         lecture:get
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['get', 'getAll'],
			},
		},
		description: 'The ID of the course',
	},
	{
		displayName: 'Lecture ID',
		name: 'lectureId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['get'],
			},
		},
		description: 'The ID of the lecture',
	},

	// ----------------------------------
	//         lecture:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['lecture'],
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
				resource: ['lecture'],
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
				resource: ['lecture'],
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
	//         lecture:getProgress
	// ----------------------------------
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['getProgress', 'updateProgress'],
			},
		},
		description: 'The ID of the course',
	},
	{
		displayName: 'Lecture ID',
		name: 'lectureId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['getProgress', 'updateProgress'],
			},
		},
		description: 'The ID of the lecture',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['getProgress', 'updateProgress'],
			},
		},
		description: 'The ID of the user',
	},

	// ----------------------------------
	//         lecture:updateProgress
	// ----------------------------------
	{
		displayName: 'Is Completed',
		name: 'is_completed',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['lecture'],
				operation: ['updateProgress'],
			},
		},
		description: 'Whether to mark the lecture as completed',
	},
];
