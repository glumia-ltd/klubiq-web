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
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
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
		FormsModule,
		ReactiveFormsModule,
		CardModule,
		InputTextModule,
		FloatLabelModule,
		PasswordModule,
		ButtonModule,
	],
	template: `
		<div class="login-container justify-content-center">
			<p-card header="Klubiq Admin Portal">
				<div
					class="w-20rem login-card flex flex-column gap-4"
					[formGroup]="loginForm"
				>
					<div class="flex flex-column gap-2">
						<p-floatLabel>
							<input
								class="w-19rem"
								pInputText
								id="email"
								formControlName="email"
								(blur)="updateEmailErrors()"
								required
							/>
							<label for="email">Email</label>
						</p-floatLabel>
						@if (errors().emailErrors) {
							<small class="text-red-500">{{ errors().emailErrors }}</small>
						}
					</div>

					<div class="flex flex-column gap-2">
						<p-floatLabel>
							<p-password
								id="password"
								formControlName="password"
								required
								inputStyleClass="w-19rem"
								(blur)="updatePasswordErrors()"
								[toggleMask]="true"
								[feedback]="false"
							/>
							<label for="password">Password</label>
						</p-floatLabel>
						@if (errors().passwordErrors) {
							<small class="text-red-500">{{ errors().passwordErrors }}</small>
						}
					</div>
					<p-button
						(click)="login()"
						styleClass="w-19rem"
						[disabled]="loginForm.invalid"
						label="Login"
					/>
				</div>
			</p-card>
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
			// max-width: 400px;
			// width: 100%;
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
				this.updateEmailErrors();
				this.updatePasswordErrors();
			});
	}

	ngOnInit(): void {}
	updatePasswordErrors() {
		const passwordForm = this.loginForm.get('password');
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
	updateEmailErrors() {
		const emailForm = this.loginForm.get('email');

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
