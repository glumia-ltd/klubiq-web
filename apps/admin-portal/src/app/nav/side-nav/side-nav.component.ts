import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

export interface NavLink {
	label: string;
	path: string;
	icon: string;
}
@Component({
	selector: 'app-side-nav',
	standalone: true,
	imports: [CommonModule, RouterLink, MatIconModule, MatListModule],
	template: `
		<mat-nav-list class="nav-list">
			@for (link of navLinks; track $index) {
				<mat-list-item
					[routerLink]="link.path"
					[activated]="isCurrentRoute(link.path)"
					ariaCurrentWhenActive="page"
				>
					<div class="nav-item">
						<mat-icon matListIcon>{{ link.icon }}</mat-icon>
						<div>{{ link.label }}</div>
					</div>
				</mat-list-item>
			}
			<mat-list-item (click)="logout()">Logout</mat-list-item>
		</mat-nav-list>
	`,
	styles: `
		.nav-list {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
		.nav-item {
			display: flex;
			gap: 4px;
			flex-direction: row;
		}
	`,
})
export class SideNavComponent {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthService,
	) {}

	isCurrentRoute(path: string): boolean {
		return this.router.url.includes(path);
	}
	// Define the navigation links
	navLinks: NavLink[] = [
		{
			label: 'Dashboard',
			path: '/dashboard',
			icon: 'dashboard',
		},
		{
			label: 'Users',
			path: '/users',
			icon: 'group',
		},
		{
			label: 'Roles',
			path: '/roles',
			icon: 'admin_panel_settings',
		},
		{
			label: 'Features',
			path: '/features',
			icon: 'apps',
		},
	];

	logout() {
		this.authService.logoutUser();
		// .then(() => {
		//   this.router.navigate(['/login']);
		// });
	}
}
