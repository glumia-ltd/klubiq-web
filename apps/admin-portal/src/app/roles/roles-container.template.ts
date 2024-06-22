import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../services/roles-features.service';
import { Role, OrgRole } from '../shared';

@Component({
	selector: 'app-roles-container',
	standalone: true,
	template: ` <mat-tab-group>
		<mat-tab label="System Roles">Content 1</mat-tab>
		<mat-tab label="Organization Roles">Content 2</mat-tab>
	</mat-tab-group>`,
	styles: ``,
	imports: [CommonModule, MatTabsModule],
})
export class RolesContainerComponent implements OnInit {
	roles: Signal<Role | null> = computed(() =>
		this.rolesFeaturesService.roles(),
	);

	orgRoles: Signal<OrgRole | null> = computed(() =>
		this.rolesFeaturesService.orgRoles(),
	);

	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
	) {
		this.rolesFeaturesService.getRoles();
		this.rolesFeaturesService.getOrgRoles();
	}

	ngOnInit(): void {}
}
