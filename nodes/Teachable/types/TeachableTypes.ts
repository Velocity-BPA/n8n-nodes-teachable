/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

// User Types
export interface ITeachableUser {
	id: number;
	email: string;
	name: string;
	role: string;
	src?: string;
	created_at?: string;
	last_sign_in_at?: string;
	meta?: IDataObject;
}

export interface ITeachableUserCreate {
	email: string;
	name?: string;
	password?: string;
	src?: string;
	unsubscribe_from_marketing_emails?: boolean;
}

export interface ITeachableUserUpdate {
	name?: string;
	email?: string;
	src?: string;
	meta?: IDataObject;
}

// Course Types
export interface ITeachableCourse {
	id: number;
	name: string;
	heading?: string;
	description?: string;
	image_url?: string;
	is_published: boolean;
	author_bio_id?: number;
	created_at?: string;
}

export interface ITeachableCurriculum {
	course_id: number;
	lecture_sections: ITeachableLectureSection[];
}

export interface ITeachableLectureSection {
	id: number;
	name: string;
	position: number;
	lectures: ITeachableLecture[];
}

// Enrollment Types
export interface ITeachableEnrollment {
	id: number;
	user_id: number;
	course_id: number;
	enrolled_at: string;
	is_active: boolean;
	completed_at?: string;
	expires_at?: string;
	percent_complete?: number;
	price_paid?: number;
}

export interface ITeachableEnrollmentCreate {
	user_id: number;
	course_id: number;
	price_paid?: number;
	enrolled_at?: string;
	expire_at?: string;
	coupon_code?: string;
}

export interface ITeachableEnrollmentUpdate {
	is_active?: boolean;
	expire_at?: string;
}

// Transaction Types
export interface ITeachableTransaction {
	id: number;
	user_id: number;
	course_id: number;
	price: number;
	final_price: number;
	coupon_code?: string;
	transaction_type: string;
	created_at: string;
	refunded_at?: string;
}

// Coupon Types
export interface ITeachableCoupon {
	id: number;
	code: string;
	course_id?: number;
	discount_type: 'percent' | 'amount';
	discount_amount: number;
	quantity?: number;
	used_count?: number;
	expires_at?: string;
	created_at?: string;
}

export interface ITeachableCouponCreate {
	code: string;
	course_id?: number;
	discount_type: 'percent' | 'amount';
	discount_amount: number;
	quantity?: number;
	expires_at?: string;
}

export interface ITeachableCouponUpdate {
	quantity?: number;
	expires_at?: string;
}

// Lecture Types
export interface ITeachableLecture {
	id: number;
	name: string;
	position: number;
	is_published: boolean;
	lecture_type?: string;
	duration?: number;
}

export interface ITeachableLectureProgress {
	lecture_id: number;
	user_id: number;
	is_completed: boolean;
	completed_at?: string;
	percent_complete?: number;
}

// School Types
export interface ITeachableSchool {
	id: number;
	name: string;
	subdomain: string;
	primary_owner_id: number;
	created_at?: string;
}

export interface ITeachableSchoolStats {
	total_users: number;
	total_courses: number;
	total_enrollments: number;
	total_revenue: number;
}

// Webhook Types
export interface ITeachableWebhook {
	id: number;
	url: string;
	event: TeachableWebhookEvent;
	created_at?: string;
}

export type TeachableWebhookEvent =
	| 'new.enrollment'
	| 'enrollment.completed'
	| 'new.transaction'
	| 'transaction.refunded'
	| 'new.user'
	| 'new.comment';

export interface ITeachableWebhookCreate {
	url: string;
	event: TeachableWebhookEvent;
}

// Pagination Types
export interface ITeachablePaginationMeta {
	page: number;
	total: number;
	number_of_pages: number;
}

export interface ITeachablePaginatedResponse<T> {
	data: T[];
	meta: ITeachablePaginationMeta;
}

// API Response Types
export interface ITeachableApiResponse {
	users?: ITeachableUser[];
	courses?: ITeachableCourse[];
	enrollments?: ITeachableEnrollment[];
	transactions?: ITeachableTransaction[];
	coupons?: ITeachableCoupon[];
	lectures?: ITeachableLecture[];
	webhooks?: ITeachableWebhook[];
	meta?: ITeachablePaginationMeta;
}

// Resource Types for Node
export type TeachableResource =
	| 'user'
	| 'course'
	| 'enrollment'
	| 'transaction'
	| 'coupon'
	| 'lecture'
	| 'school'
	| 'webhook';

// Operation Types
export type UserOperation =
	| 'create'
	| 'get'
	| 'getByEmail'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getCurrentUser';

export type CourseOperation =
	| 'get'
	| 'getAll'
	| 'getStudents'
	| 'getCurriculum';

export type EnrollmentOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';

export type TransactionOperation =
	| 'getAll'
	| 'getForCourse'
	| 'getForUser';

export type CouponOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';

export type LectureOperation =
	| 'get'
	| 'getAll'
	| 'getProgress'
	| 'updateProgress';

export type SchoolOperation =
	| 'getInfo'
	| 'getStats';

export type WebhookOperation =
	| 'create'
	| 'getAll'
	| 'delete';
