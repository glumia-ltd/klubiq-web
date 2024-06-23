import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
	Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { merge } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface LoginValidationError {
	emailErrors: string;
	passwordErrors: string;
}
@Component({
	selector: 'app-login',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		RouterLink,
		MatIconModule,
		MatListModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
	],
	template: `
		<div class="login-container">
			<mat-card appearance="outlined" class="login-card">
				<mat-card-header>
					<mat-card-title>Klubiq Admin Portal</mat-card-title>
				</mat-card-header>
				<mat-card-content class="card-content">
					<mat-form-field
						[formGroup]="loginForm"
						class="input"
						appearance="outline"
					>
						<mat-label>Email</mat-label>
						<input
							matInput
							formControlName="email"
							(blur)="updateErrors()"
							required
						/>
						@if (errors().emailErrors) {
							<mat-error>{{ errors().emailErrors }}</mat-error>
						}
					</mat-form-field>

					<mat-form-field
						[formGroup]="loginForm"
						class="input"
						appearance="outline"
					>
						<mat-label>Password</mat-label>
						<input
							matInput
							[type]="hide() ? 'password' : 'text'"
							formControlName="password"
							required
							(blur)="updateErrors()"
						/>
						<button
							mat-icon-button
							matSuffix
							(click)="togglePasswordVisibility($event)"
							[attr.aria-label]="'Hide password'"
							[attr.aria-pressed]="hide()"
						>
							<mat-icon>{{
								hide() ? 'visibility_off' : 'visibility'
							}}</mat-icon>
						</button>
						@if (errors().passwordErrors) {
							<mat-error>{{ errors().passwordErrors }}</mat-error>
						}
					</mat-form-field>

					<button
						class="submit"
						(click)="login()"
						[disabled]="loginForm.invalid"
						mat-flat-button
					>
						Login
					</button>
				</mat-card-content>
			</mat-card>
		</div>
	`,
	styles: `
		.login-container {
			display: flex;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.login-card {
			display: flex;
			max-width: 400px;
			width: 100%;
			align-items: center;
			gap: 8px;
		}
		.input,
		.submit {
			width: 330px;
		}

		.card-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 16px;
		}
	`,
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});
	hide = signal<boolean>(true);
	errors = signal<LoginValidationError>({
		emailErrors: '',
		passwordErrors: '',
	});
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
	) {
		merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.updateErrors();
			});
	}

	ngOnInit(): void {}
	updateErrors() {
		const emailForm = this.loginForm.get('email');
		const passwordForm = this.loginForm.get('password');
		if (emailForm?.hasError) {
			if (emailForm?.hasError('required')) {
				this.errors.set({
					...this.errors(),
					emailErrors: 'Email is required',
				});
			} else if (emailForm?.hasError('email')) {
				this.errors.set({
					...this.errors(),
					emailErrors: 'Invalid email format',
				});
			} else {
				this.errors.set({
					...this.errors(),
					emailErrors: '',
				});
			}
		}
		if (passwordForm?.hasError) {
			if (passwordForm?.hasError('required')) {
				this.errors.set({
					...this.errors(),
					passwordErrors: 'Password is required',
				});
			} else {
				this.errors.set({
					...this.errors(),
					passwordErrors: '',
				});
			}
		}
	}

	get email() {
		return this.loginForm.get('email');
	}
	get password() {
		return this.loginForm.get('password');
	}
	togglePasswordVisibility(event: MouseEvent) {
		this.hide.set(!this.hide());
		event.stopPropagation();
	}

	login() {
		console.log('Email: ', this.email?.value);
		console.log('Password: ', this.password?.value);
		this.authService
			.loginUser({
				email: this.email?.value,
				password: this.password?.value,
			})
			.then((user) => {
				console.log('LOGGER IN LOGIN PAGE', user);
			});
	}
}
