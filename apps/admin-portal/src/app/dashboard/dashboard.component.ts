import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, MatSidenavModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
