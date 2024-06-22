import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		title: 'Dashboard',
	},
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
		title: 'Login',
	},
];
