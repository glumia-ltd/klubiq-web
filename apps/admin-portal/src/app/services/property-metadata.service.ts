import { Inject, Injectable, signal } from '@angular/core';
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth';
import {
	ApiResponse,
	Role,
	OrgRole,
	FeaturePermission,
	CommonDataModel,
	UpdateOrgRole,
	CreateOrgRole,
} from '../shared';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import * as env from '../../environments/environment';
import {
	PropertyMetadata,
	UpdateMetaData,
} from '../shared/models/property-metadata.model';
// const auth = getAuth();

@Injectable({
	providedIn: 'root',
})
export class PropertyMetadataService {
	categories = signal<PropertyMetadata[]>([]);
	purposes = signal<PropertyMetadata[]>([]);
	types = signal<PropertyMetadata[]>([]);
	statuses = signal<PropertyMetadata[]>([]);
	amenities = signal<PropertyMetadata[]>([]);

	constructor(
		private router: Router,
		private http: HttpClient,
	) {}

	//#region Categories
	async getCategories() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-categories`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.categories.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createCategory(data: PropertyMetadata) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-categories`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getCategories();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateCategory(id: number, data: UpdateMetaData) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-categories/${id}`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getCategories();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	//#endregion

	//#region purposes
	async getPurposes() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-purposes`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.purposes.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createPurpose(data: PropertyMetadata) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-purposes`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getPurposes();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updatePurpose(id: number, data: PropertyMetadata) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-purposes/${id}`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getCategories();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	//#endregion

	//#region types
	async getTypes() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-types`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.types.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createType(data: PropertyMetadata) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-types`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getTypes();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateType(id: number, data: PropertyMetadata) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-types/${id}`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getTypes();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	//#endregion

	//#region purposes
	async getStatuses() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-statuses`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.statuses.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createStatus(data: PropertyMetadata) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-statuses`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getStatuses();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateStatus(id: number, data: PropertyMetadata) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-statuses/${id}`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getStatuses();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	//#endregion

	//#region amenities
	async getAmenities() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-amenities`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.amenities.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createAmenity(data: PropertyMetadata) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-amenities`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getAmenities();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateAmenity(id: number, data: PropertyMetadata) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/property-metadata/property-amenities/${id}`,
				data,
			)
			.subscribe({
				next: (res) => {
					if (res.status === 'success') {
						this.getAmenities();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	//#endregion
}
