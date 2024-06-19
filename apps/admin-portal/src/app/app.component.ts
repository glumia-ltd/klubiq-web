import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		MatToolbarModule,
		MatSidenavModule,
		RouterModule,
		RouterOutlet,
		DashboardComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	title = 'admin-portal';
}
