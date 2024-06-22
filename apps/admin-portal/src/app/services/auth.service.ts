import { Inject, Injectable, signal, OnInit } from '@angular/core';
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	User,
	browserSessionPersistence,
} from 'firebase/auth';
import { ApiResponse, Login, UserProfile } from '../shared';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of } from 'rxjs';
import * as env from '../../environments/environment';
// const auth = getAuth();
@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnInit {
	isUserSignedIn = signal<boolean>(false);
	currentUser = signal<any>(null);
	userProfile = signal<UserProfile | null>(null);

	private firebaseClientAuth: Auth;
	constructor(
		@Inject('FIREBASE_APP') private firebaseApp: any,
		private router: Router,
		private http: HttpClient,
	) {
		this.firebaseClientAuth = getAuth(this.firebaseApp);
		onAuthStateChanged(this.firebaseClientAuth, (user) => {
			if (user) {
				user
					.getIdToken()
					.then((token) => {
						this.currentUser.set(user);
						this.isUserSignedIn.set(true);
					})
					.catch((err) => {
						this.router.navigate(['/login']);
					});
			} else {
				this.currentUser.set(null);
				this.isUserSignedIn.set(false);
				this.router.navigate(['/login']);
			}
		});
		// Listen for auth state changes.
	}

	ngOnInit(): void {}

	get auth(): Auth {
		return this.firebaseClientAuth;
	}

	async loginUser(loginData: Login): Promise<any> {
		await signInWithEmailAndPassword(
			this.firebaseClientAuth,
			loginData.email,
			loginData.password,
		)
			.then(async (userCredential) => {
				// Signed in
				userCredential.user.getIdTokenResult().then((result) => {
					this.currentUser.set(userCredential.user);
					this.getUserProfile();
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async logoutUser() {
		this.firebaseClientAuth
			.signOut()
			.then(() => {
				this.isUserSignedIn.set(false);
				console.log('User logged out');
			})
			.catch((error) => {
				console.log(error);
			});
	}
	getUser(): User | null {
		return this.firebaseClientAuth.currentUser;
	}
	getToken(): string | null {
		const sessionData = JSON.parse(
			sessionStorage.getItem(
				`firebase:authUser:${env.environment.firebase.apiKey}:${this.firebaseClientAuth.name}`,
			)!,
		);
		return sessionData?.stsTokenManager?.accessToken;
	}
	storeUserProfile(data: any) {
		sessionStorage.setItem('user-profile', JSON.stringify(data));
	}
	getUserProfileFromStorage() {
		return JSON.parse(sessionStorage.getItem('user-profile')!);
	}
	clearSessionData() {
		sessionStorage.removeItem('user-profile');
	}

	getUserProfile(): void {
		this.http
			.get<ApiResponse>(`${env.environment.apiUrl}/api/auth/user`)
			.subscribe({
				next: (response: ApiResponse) => {
					this.storeUserProfile(response.data);
					this.isUserSignedIn.set(true);
					this.router.navigate(['/']);
				},
				error: (err) => {
					console.log(err);
					this.userProfile.set(null);
					this.isUserSignedIn.set(false);
					this.logoutUser();
				},
			});
	}
}
