/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const couponOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['coupon'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new coupon',
				action: 'Create a coupon',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a coupon',
				action: 'Delete a coupon',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get coupon details',
				action: 'Get a coupon',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many coupons',
				action: 'Get many coupons',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a coupon',
				action: 'Update a coupon',
			},
		],
		default: 'getAll',
	},
];

export const couponFields: INodeProperties[] = [
	// ----------------------------------
	//         coupon:create
	// ----------------------------------
	{
		displayName: 'Coupon Code',
		name: 'code',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'The unique coupon code',
	},
	{
		displayName: 'Discount Type',
		name: 'discount_type',
		type: 'options',
		required: true,
		options: [
			{
				name: 'Amount',
				value: 'amount',
			},
			{
				name: 'Percent',
				value: 'percent',
			},
		],
		default: 'percent',
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'The type of discount',
	},
	{
		displayName: 'Discount Amount',
		name: 'discount_amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		description: 'The discount value (percentage or fixed amount)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Course ID',
				name: 'course_id',
				type: 'number',
				default: 0,
				description: 'Limit the coupon to a specific course (0 for all courses)',
			},
			{
				displayName: 'Expires At',
				name: 'expires_at',
				type: 'dateTime',
				default: '',
				description: 'When the coupon expires',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 0,
				description: 'Maximum number of uses (0 for unlimited)',
			},
		],
	},

	// ----------------------------------
	//         coupon:get
	// ----------------------------------
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the coupon',
	},

	// ----------------------------------
	//         coupon:getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['coupon'],
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
				resource: ['coupon'],
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
				resource: ['coupon'],
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
		],
	},

	// ----------------------------------
	//         coupon:update
	// ----------------------------------
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		description: 'The ID of the coupon to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['coupon'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Expires At',
				name: 'expires_at',
				type: 'dateTime',
				default: '',
				description: 'When the coupon expires',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 0,
				description: 'Maximum number of uses (0 for unlimited)',
			},
		],
	},
];
