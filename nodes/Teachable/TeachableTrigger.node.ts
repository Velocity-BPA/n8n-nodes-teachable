/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

import { teachableApiRequest } from './transport/GenericFunctions';

export class TeachableTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Teachable Trigger',
		name: 'teachableTrigger',
		icon: 'file:teachable.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Handle Teachable webhook events',
		defaults: {
			name: 'Teachable Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'teachableApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				options: [
					{
						name: 'Enrollment Completed',
						value: 'enrollment.completed',
						description: 'Triggered when a user completes a course',
					},
					{
						name: 'New Comment',
						value: 'new.comment',
						description: 'Triggered when a new comment is posted',
					},
					{
						name: 'New Enrollment',
						value: 'new.enrollment',
						description: 'Triggered when a user enrolls in a course',
					},
					{
						name: 'New Transaction',
						value: 'new.transaction',
						description: 'Triggered when a new transaction occurs',
					},
					{
						name: 'New User',
						value: 'new.user',
						description: 'Triggered when a new user signs up',
					},
					{
						name: 'Transaction Refunded',
						value: 'transaction.refunded',
						description: 'Triggered when a transaction is refunded',
					},
				],
				default: 'new.enrollment',
				description: 'The event to listen for',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				try {
					const response = await teachableApiRequest.call(this, 'GET', '/webhooks');
					const webhooks = (response.webhooks as IDataObject[]) || [];

					for (const webhook of webhooks) {
						if (webhook.url === webhookUrl && webhook.event === event) {
							const webhookData = this.getWorkflowStaticData('node');
							webhookData.webhookId = webhook.id;
							return true;
						}
					}

					return false;
				} catch {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;

				try {
					const response = await teachableApiRequest.call(this, 'POST', '/webhooks', {
						url: webhookUrl,
						event,
					});

					const webhookData = this.getWorkflowStaticData('node');
					webhookData.webhookId = (response as IDataObject).id;

					return true;
				} catch {
					return false;
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId;

				if (webhookId) {
					try {
						await teachableApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`);
					} catch {
						return false;
					}
				}

				delete webhookData.webhookId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();

		return {
			workflowData: [this.helpers.returnJsonArray(bodyData)],
		};
	}
}
