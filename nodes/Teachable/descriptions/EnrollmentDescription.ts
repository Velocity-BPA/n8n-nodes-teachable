/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const enrollmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['enrollment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Enroll a user in a course',
				action: 'Create an enrollment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Remove an enrollment',
				action: 'Delete an enrollment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get enrollment details',
				action: 'Get an enrollment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many enrollments',
				action: 'Get many enrollments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an enrollment',
				action: 'Update an enrollment',
			},
		],
		default: 'getAll',
	},
];

export const enrollmentFields: INodeProperties[] = [
	// ----------------------------------
	//         enrollment:create
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		description: 'The ID of the user to enroll',
	},
	{
		displayName: 'Course ID',
		name: 'courseId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		description: 'The ID of the course to enroll the user in',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Coupon Code',
				name: 'coupon_code',
				type: 'string',
				default: '',
				description: 'A coupon code to apply to the enrollment',
			},
			{
				displayName: 'Enrolled At',
				name: 'enrolled_at',
				type: 'dateTime',
				default: '',
				description: 'The enrollment date (defaults to current date)',
			},
			{
				displayName: 'Expire At',
				name: 'expire_at',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should expire',
			},
			{
				displayName: 'Price Paid',
				name: 'price_paid',
				type: 'number',
				default: 0,
				description: 'The amount paid for the enrollment',
			},
		],
	},

	// ----------------------------------
	//         enrollment:get
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the enrollment',
	},

	// ----------------------------------
	//         enrollment:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['enrollment'],
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
				resource: ['enrollment'],
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
				resource: ['enrollment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Course ID',
				name: 'course_id',
				type: 'number',
				default: 0,
				description: 'Filter by course ID',
			},
			{
				displayName: 'Is Active',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether to filter by active status',
			},
			{
				displayName: 'User ID',
				name: 'user_id',
				type: 'number',
				default: 0,
				description: 'Filter by user ID',
			},
		],
	},

	// ----------------------------------
	//         enrollment:update
	// ----------------------------------
	{
		displayName: 'Enrollment ID',
		name: 'enrollmentId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['update'],
			},
		},
		description: 'The ID of the enrollment to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['enrollment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Expire At',
				name: 'expire_at',
				type: 'dateTime',
				default: '',
				description: 'When the enrollment should expire',
			},
			{
				displayName: 'Is Active',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether the enrollment is active',
			},
		],
	},
];
