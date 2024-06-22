import { Inject, Injectable, signal } from '@angular/core';
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth';
import { ApiResponse, Role, OrgRole } from '../shared';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import * as env from '../../environments/environment';
// const auth = getAuth();
@Injectable({
	providedIn: 'root',
})
export class RolesFeaturesService {
	roles = signal<Role | null>(null);
	orgRoles = signal<OrgRole | null>(null);
	features = signal<any | null>(null);
	featurePermissions = signal<any | null>(null);

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

	async getFeaturePermissions() {
		this.http
			.get<ApiResponse>(`${env.environment.apiUrl}/api/public/features`)
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
}
