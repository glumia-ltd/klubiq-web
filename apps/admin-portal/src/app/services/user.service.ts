import { Inject, Injectable, signal } from '@angular/core';
import {
	Auth,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { Login } from '../shared';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// const auth = getAuth();
@Injectable({
	providedIn: 'root',
})
export class UserService {
	isUserSignedIn = signal<boolean>(false);
	currentUser = signal<any>(null);
	constructor(private http: HttpClient) {}

	getUser() {
		return this.http.get('XXXXXXXXXXXXXXXXXXXXXXXXXX');
	}
}
