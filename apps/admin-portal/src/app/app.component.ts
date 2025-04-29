import { Component, computed, Inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AuthService } from './services/auth.service';
import { Auth, User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import * as env from '../environments/environment';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterModule,
		RouterOutlet,
		LoginComponent,
		CommonModule,
		MenubarModule,
		AvatarModule,
		ProgressSpinnerModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	items: MenuItem[] = [];
	activeItem: MenuItem = {};
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
		private router: Router,
	) {
		this.auth = authService.auth;
	}
	ngOnInit(): void {
		this.items = [
			{
				label: 'Dashboard',
				icon: PrimeIcons.MICROSOFT,
				routerLink: ['/dashboard'],
			},
			{
				label: 'Users',
				icon: PrimeIcons.USERS,
				routerLink: ['/users'],
			},
			{
				label: 'Roles',
				icon: PrimeIcons.SHIELD,
				routerLink: ['/roles'],
			},
			{
				label: 'Features',
				icon: PrimeIcons.TH_LARGE,
				routerLink: ['/features'],
			},
			{
				label: 'Property Metadata',
				icon: PrimeIcons.BUILDING_COLUMNS,
				routerLink: ['/property-metadata'],
			},
		];
		this.activeItem = this.items[0];
	}
}
