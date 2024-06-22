import { Component, computed, Signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RolesFeaturesService } from '../services/roles-features.service';
import { OrgRole, Role } from '../shared';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [CommonModule, MatSidenavModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
	title = 'Dashboard';

	// @Input() roles: Role[] | null = null;
	// @Input() orgRoles: OrgRole[] | null = null;
	// @Input() features: any[] | null = null;
	// @Input() featurePermissions: any[] | null = null;

	roles: Signal<Role | null> = computed(() =>
		this.rolesFeaturesService.roles(),
	);

	orgRoles: Signal<OrgRole | null> = computed(() =>
		this.rolesFeaturesService.orgRoles(),
	);

	features: Signal<any | null> = computed(() =>
		this.rolesFeaturesService.features(),
	);
	featurePermissions: Signal<any | null> = computed(() =>
		this.rolesFeaturesService.featurePermissions(),
	);
	constructor(public rolesFeaturesService: RolesFeaturesService) {}
	ngOnInit(): void {
		this.rolesFeaturesService.getRoles();
		this.rolesFeaturesService.getOrgRoles();
		this.rolesFeaturesService.getFeatures();
		this.rolesFeaturesService.getFeaturePermissions();
		console.log('CALLING INIT HERE');
	}
}
