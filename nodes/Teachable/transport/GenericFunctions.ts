/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

const BASE_URL = 'https://developers.teachable.com/v1';

/**
 * Make an authenticated request to the Teachable API
 */
export async function teachableApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('teachableApi');

	const options: IRequestOptions = {
		method,
		uri: `${BASE_URL}${endpoint}`,
		headers: {
			apiKey: credentials.apiKey as string,
			'Content-Type': 'application/json',
		},
		qs: query,
		json: true,
	};

	if (Object.keys(body).length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
		options.body = body;
	}

	try {
		const response = await this.helpers.request(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: getErrorMessage(error as JsonObject),
		});
	}
}

/**
 * Make an authenticated request to the Teachable API with pagination
 */
export async function teachableApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	query: IDataObject = {},
	propertyName: string,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];

	let page = 1;
	const perPage = query.per ? (query.per as number) : 100;
	let responseData: IDataObject;

	do {
		query.page = page;
		query.per = perPage;

		responseData = await teachableApiRequest.call(this, method, endpoint, body, query);

		const items = responseData[propertyName] as IDataObject[];
		if (items && Array.isArray(items)) {
			returnData.push(...items);
		}

		const meta = responseData.meta as IDataObject | undefined;
		const totalPages = meta?.number_of_pages as number | undefined;

		if (!totalPages || page >= totalPages) {
			break;
		}

		page++;
	} while (page > 0);

	return returnData;
}

/**
 * Extract error message from API response
 */
function getErrorMessage(error: JsonObject): string {
	if (error.error && typeof error.error === 'string') {
		return error.error;
	}

	if (error.message && typeof error.message === 'string') {
		return error.message;
	}

	if (error.errors && Array.isArray(error.errors)) {
		return (error.errors as string[]).join(', ');
	}

	const statusCode = error.statusCode as number | undefined;
	switch (statusCode) {
		case 400:
			return 'Bad request - The request was invalid or malformed';
		case 401:
			return 'Unauthorized - API key is invalid or missing';
		case 404:
			return 'Not found - The requested resource does not exist';
		case 422:
			return 'Validation error - The request data failed validation';
		case 429:
			return 'Rate limited - Too many requests, please try again later';
		case 500:
			return 'Server error - Internal server error occurred';
		default:
			return 'An unknown error occurred';
	}
}

/**
 * Validate and clean request body
 */
export function cleanBody(body: IDataObject): IDataObject {
	const cleanedBody: IDataObject = {};

	for (const [key, value] of Object.entries(body)) {
		if (value !== undefined && value !== null && value !== '') {
			cleanedBody[key] = value;
		}
	}

	return cleanedBody;
}

/**
 * Parse date string or return undefined
 */
export function parseDate(dateString: string | undefined): string | undefined {
	if (!dateString) {
		return undefined;
	}

	try {
		const date = new Date(dateString);
		return date.toISOString();
	} catch {
		return dateString;
	}
}
