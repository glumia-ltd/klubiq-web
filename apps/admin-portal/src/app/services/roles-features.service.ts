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
// const auth = getAuth();
@Injectable({
	providedIn: 'root',
})
export class RolesFeaturesService {
	roles = signal<Role[]>([]);
	orgRoles = signal<OrgRole[]>([]);
	features = signal<CommonDataModel[]>([]);
	featurePermissions = signal<FeaturePermission[]>([]);
	permissions = signal<CommonDataModel[]>([]);

	constructor(
		private router: Router,
		private http: HttpClient,
	) {}

	async getRoles() {
		this.http
			.get<ApiResponse>(`${env.environment.apiUrl}/api/public/system-roles`)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.roles.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async getOrgRoles() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/public/organization-roles`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.orgRoles.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async getFeatures() {
		this.http
			.get<ApiResponse>(`${env.environment.apiUrl}/api/public/features`)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.features.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async getPermissions() {
		this.http
			.get<ApiResponse>(`${env.environment.apiUrl}/api/public/permissions`)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.permissions.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async getFeaturePermissions() {
		this.http
			.get<ApiResponse>(
				`${env.environment.apiUrl}/api/public/features-permissions`,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.featurePermissions.set(res.data);
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateOrgRole(role: UpdateOrgRole) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/public/organization-roles/${role.id}`,
				role,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.getOrgRoles();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createOrgRole(role: CreateOrgRole) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/public/organization-roles/`,
				role,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.getOrgRoles();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async updateRole(role: Role) {
		this.http
			.put<ApiResponse>(
				`${env.environment.apiUrl}/api/public/system-roles/${role.id}`,
				role,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.getRoles();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}

	async createRole(role: Role) {
		this.http
			.post<ApiResponse>(
				`${env.environment.apiUrl}/api/public/system-roles/`,
				role,
			)
			.subscribe({
				next: (res) => {
					if (res.data) {
						this.getRoles();
					}
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
}
