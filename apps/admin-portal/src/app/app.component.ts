import { Component, computed, Inject, Signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { LoginComponent } from './auth/login.component';
import { AuthService } from './services/auth.service';
import { Auth, User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as env from '../environments/environment';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		RouterModule,
		RouterOutlet,
		SideNavComponent,
		LoginComponent,
		CommonModule,
		MatProgressBarModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = env.environment.appName;
	isUserSignedIn: Signal<boolean> = computed(() =>
		this.authService.isUserSignedIn(),
	);
	user: Signal<User> = computed(() => this.authService.currentUser());
	isLoading: Signal<boolean> = computed(() => this.loaderService.isLoading());
	auth: Auth;
	constructor(
		private authService: AuthService,
		private loaderService: LoaderService,
	) {
		this.auth = authService.auth;
	}
}
