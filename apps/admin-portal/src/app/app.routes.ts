import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesContainerComponent } from './roles/roles-container.component';
import { LoginComponent } from './auth/login.component';
import { PropertyMetadataComponent } from './property-metdata/property-metadata.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		title: 'Dashboard',
	},
	{
		path: 'roles',
		component: RolesContainerComponent,
		title: 'Roles',
	},
	{
		path: '',
		redirectTo: '/roles',
		pathMatch: 'full',
	},
	{
		path: 'property-metadata',
		component: PropertyMetadataComponent,
		title: 'Property Metadata',
	},
	{
		path: 'login',
		component: LoginComponent,
		title: 'Login',
	},
];
