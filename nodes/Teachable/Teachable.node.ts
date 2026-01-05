/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	teachableApiRequest,
	teachableApiRequestAllItems,
	cleanBody,
	parseDate,
} from './transport/GenericFunctions';

import {
	userOperations,
	userFields,
	courseOperations,
	courseFields,
	enrollmentOperations,
	enrollmentFields,
	transactionOperations,
	transactionFields,
	couponOperations,
	couponFields,
	lectureOperations,
	lectureFields,
	schoolOperations,
	schoolFields,
	webhookOperations,
	webhookFields,
} from './descriptions';

// Emit licensing notice once on node load
const LICENSING_LOGGED = Symbol.for('teachable.licensing.logged');
if (!(globalThis as Record<symbol, boolean>)[LICENSING_LOGGED]) {
	console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`);
	(globalThis as Record<symbol, boolean>)[LICENSING_LOGGED] = true;
}

export class Teachable implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Teachable',
		name: 'teachable',
		icon: 'file:teachable.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Teachable API for course management, student enrollment, and sales tracking',
		defaults: {
			name: 'Teachable',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'teachableApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Coupon',
						value: 'coupon',
					},
					{
						name: 'Course',
						value: 'course',
					},
					{
						name: 'Enrollment',
						value: 'enrollment',
					},
					{
						name: 'Lecture',
						value: 'lecture',
					},
					{
						name: 'School',
						value: 'school',
					},
					{
						name: 'Transaction',
						value: 'transaction',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'user',
			},
			// User
			...userOperations,
			...userFields,
			// Course
			...courseOperations,
			...courseFields,
			// Enrollment
			...enrollmentOperations,
			...enrollmentFields,
			// Transaction
			...transactionOperations,
			...transactionFields,
			// Coupon
			...couponOperations,
			...couponFields,
			// Lecture
			...lectureOperations,
			...lectureFields,
			// School
			...schoolOperations,
			...schoolFields,
			// Webhook
			...webhookOperations,
			...webhookFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// User Operations
				if (resource === 'user') {
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							email,
							...additionalFields,
						};

						responseData = await teachableApiRequest.call(this, 'POST', '/users', cleanBody(body));
					}

					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await teachableApiRequest.call(this, 'GET', `/users/${userId}`);
					}

					if (operation === 'getByEmail') {
						const email = this.getNodeParameter('email', i) as string;
						responseData = await teachableApiRequest.call(this, 'GET', '/users', {}, { email });
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/users',
								{},
								cleanBody(filters),
								'users',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/users',
								{},
								{ ...cleanBody(filters), per: limit },
							);
							responseData = (response.users as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const userId = this.getNodeParameter('userId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						responseData = await teachableApiRequest.call(
							this,
							'PUT',
							`/users/${userId}`,
							cleanBody(updateFields),
						);
					}

					if (operation === 'delete') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await teachableApiRequest.call(this, 'DELETE', `/users/${userId}`);
					}

					if (operation === 'getCurrentUser') {
						responseData = await teachableApiRequest.call(this, 'GET', '/users/current');
					}
				}

				// Course Operations
				if (resource === 'course') {
					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						responseData = await teachableApiRequest.call(this, 'GET', `/courses/${courseId}`);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/courses',
								{},
								cleanBody(filters),
								'courses',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/courses',
								{},
								{ ...cleanBody(filters), per: limit },
							);
							responseData = (response.courses as IDataObject[]) || [];
						}
					}

					if (operation === 'getStudents') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								`/courses/${courseId}/students`,
								{},
								{},
								'users',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								`/courses/${courseId}/students`,
								{},
								{ per: limit },
							);
							responseData = (response.users as IDataObject[]) || [];
						}
					}

					if (operation === 'getCurriculum') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						responseData = await teachableApiRequest.call(
							this,
							'GET',
							`/courses/${courseId}/curriculum`,
						);
					}
				}

				// Enrollment Operations
				if (resource === 'enrollment') {
					if (operation === 'create') {
						const userId = this.getNodeParameter('userId', i) as number;
						const courseId = this.getNodeParameter('courseId', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							user_id: userId,
							course_id: courseId,
						};

						if (additionalFields.enrolled_at) {
							body.enrolled_at = parseDate(additionalFields.enrolled_at as string);
						}
						if (additionalFields.expire_at) {
							body.expire_at = parseDate(additionalFields.expire_at as string);
						}
						if (additionalFields.price_paid !== undefined) {
							body.price_paid = additionalFields.price_paid;
						}
						if (additionalFields.coupon_code) {
							body.coupon_code = additionalFields.coupon_code;
						}

						responseData = await teachableApiRequest.call(
							this,
							'POST',
							'/enrollments',
							cleanBody(body),
						);
					}

					if (operation === 'get') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as number;
						responseData = await teachableApiRequest.call(
							this,
							'GET',
							`/enrollments/${enrollmentId}`,
						);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/enrollments',
								{},
								cleanBody(filters),
								'enrollments',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/enrollments',
								{},
								{ ...cleanBody(filters), per: limit },
							);
							responseData = (response.enrollments as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.is_active !== undefined) {
							body.is_active = updateFields.is_active;
						}
						if (updateFields.expire_at) {
							body.expire_at = parseDate(updateFields.expire_at as string);
						}

						responseData = await teachableApiRequest.call(
							this,
							'PUT',
							`/enrollments/${enrollmentId}`,
							cleanBody(body),
						);
					}

					if (operation === 'delete') {
						const enrollmentId = this.getNodeParameter('enrollmentId', i) as number;
						responseData = await teachableApiRequest.call(
							this,
							'DELETE',
							`/enrollments/${enrollmentId}`,
						);
					}
				}

				// Transaction Operations
				if (resource === 'transaction') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const query: IDataObject = {};
						if (filters.created_after) {
							query.created_after = parseDate(filters.created_after as string);
						}
						if (filters.created_before) {
							query.created_before = parseDate(filters.created_before as string);
						}

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/transactions',
								{},
								cleanBody(query),
								'transactions',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/transactions',
								{},
								{ ...cleanBody(query), per: limit },
							);
							responseData = (response.transactions as IDataObject[]) || [];
						}
					}

					if (operation === 'getForCourse') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const query: IDataObject = {};
						if (filters.created_after) {
							query.created_after = parseDate(filters.created_after as string);
						}
						if (filters.created_before) {
							query.created_before = parseDate(filters.created_before as string);
						}

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								`/courses/${courseId}/transactions`,
								{},
								cleanBody(query),
								'transactions',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								`/courses/${courseId}/transactions`,
								{},
								{ ...cleanBody(query), per: limit },
							);
							responseData = (response.transactions as IDataObject[]) || [];
						}
					}

					if (operation === 'getForUser') {
						const userId = this.getNodeParameter('userId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						const query: IDataObject = {};
						if (filters.created_after) {
							query.created_after = parseDate(filters.created_after as string);
						}
						if (filters.created_before) {
							query.created_before = parseDate(filters.created_before as string);
						}

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								`/users/${userId}/transactions`,
								{},
								cleanBody(query),
								'transactions',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								`/users/${userId}/transactions`,
								{},
								{ ...cleanBody(query), per: limit },
							);
							responseData = (response.transactions as IDataObject[]) || [];
						}
					}
				}

				// Coupon Operations
				if (resource === 'coupon') {
					if (operation === 'create') {
						const code = this.getNodeParameter('code', i) as string;
						const discountType = this.getNodeParameter('discount_type', i) as string;
						const discountAmount = this.getNodeParameter('discount_amount', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							code,
							discount_type: discountType,
							discount_amount: discountAmount,
						};

						if (additionalFields.course_id) {
							body.course_id = additionalFields.course_id;
						}
						if (additionalFields.quantity) {
							body.quantity = additionalFields.quantity;
						}
						if (additionalFields.expires_at) {
							body.expires_at = parseDate(additionalFields.expires_at as string);
						}

						responseData = await teachableApiRequest.call(
							this,
							'POST',
							'/coupons',
							cleanBody(body),
						);
					}

					if (operation === 'get') {
						const couponId = this.getNodeParameter('couponId', i) as number;
						responseData = await teachableApiRequest.call(this, 'GET', `/coupons/${couponId}`);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/coupons',
								{},
								cleanBody(filters),
								'coupons',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/coupons',
								{},
								{ ...cleanBody(filters), per: limit },
							);
							responseData = (response.coupons as IDataObject[]) || [];
						}
					}

					if (operation === 'update') {
						const couponId = this.getNodeParameter('couponId', i) as number;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const body: IDataObject = {};
						if (updateFields.quantity !== undefined) {
							body.quantity = updateFields.quantity;
						}
						if (updateFields.expires_at) {
							body.expires_at = parseDate(updateFields.expires_at as string);
						}

						responseData = await teachableApiRequest.call(
							this,
							'PUT',
							`/coupons/${couponId}`,
							cleanBody(body),
						);
					}

					if (operation === 'delete') {
						const couponId = this.getNodeParameter('couponId', i) as number;
						responseData = await teachableApiRequest.call(this, 'DELETE', `/coupons/${couponId}`);
					}
				}

				// Lecture Operations
				if (resource === 'lecture') {
					if (operation === 'get') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const lectureId = this.getNodeParameter('lectureId', i) as number;
						responseData = await teachableApiRequest.call(
							this,
							'GET',
							`/courses/${courseId}/lectures/${lectureId}`,
						);
					}

					if (operation === 'getAll') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								`/courses/${courseId}/lectures`,
								{},
								cleanBody(filters),
								'lectures',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								`/courses/${courseId}/lectures`,
								{},
								{ ...cleanBody(filters), per: limit },
							);
							responseData = (response.lectures as IDataObject[]) || [];
						}
					}

					if (operation === 'getProgress') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const lectureId = this.getNodeParameter('lectureId', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;

						responseData = await teachableApiRequest.call(
							this,
							'GET',
							`/courses/${courseId}/lectures/${lectureId}/progress`,
							{},
							{ user_id: userId },
						);
					}

					if (operation === 'updateProgress') {
						const courseId = this.getNodeParameter('courseId', i) as number;
						const lectureId = this.getNodeParameter('lectureId', i) as number;
						const userId = this.getNodeParameter('userId', i) as number;
						const isCompleted = this.getNodeParameter('is_completed', i) as boolean;

						responseData = await teachableApiRequest.call(
							this,
							'PUT',
							`/courses/${courseId}/lectures/${lectureId}/progress`,
							{
								user_id: userId,
								is_completed: isCompleted,
							},
						);
					}
				}

				// School Operations
				if (resource === 'school') {
					if (operation === 'getInfo') {
						responseData = await teachableApiRequest.call(this, 'GET', '/school');
					}

					if (operation === 'getStats') {
						responseData = await teachableApiRequest.call(this, 'GET', '/school/stats');
					}
				}

				// Webhook Operations
				if (resource === 'webhook') {
					if (operation === 'create') {
						const url = this.getNodeParameter('url', i) as string;
						const event = this.getNodeParameter('event', i) as string;

						responseData = await teachableApiRequest.call(this, 'POST', '/webhooks', {
							url,
							event,
						});
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							responseData = await teachableApiRequestAllItems.call(
								this,
								'GET',
								'/webhooks',
								{},
								{},
								'webhooks',
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await teachableApiRequest.call(
								this,
								'GET',
								'/webhooks',
								{},
								{ per: limit },
							);
							responseData = (response.webhooks as IDataObject[]) || [];
						}
					}

					if (operation === 'delete') {
						const webhookId = this.getNodeParameter('webhookId', i) as number;
						responseData = await teachableApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
