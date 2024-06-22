import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../services/roles-features.service';
import { Role, OrgRole } from '../shared';
import { SystemRolesComponent } from './system-roles/system-roles.component';
import { OrgRolesComponent } from './org-roles/org-roles.component';

@Component({
	selector: 'app-roles-container',
	standalone: true,
	template: ` <mat-tab-group>
		<mat-tab label="System Roles">
			<app-system-roles [roles]="roles()"></app-system-roles>
		</mat-tab>
		<mat-tab label="Organization Roles">
			<app-org-roles [orgRoles]="orgRoles()"></app-org-roles>
		</mat-tab>
	</mat-tab-group>`,
	styles: ``,
	imports: [
		CommonModule,
		MatTabsModule,
		SystemRolesComponent,
		OrgRolesComponent,
	],
})
export class RolesContainerComponent implements OnInit {
	roles: Signal<Role[]> = computed(() => this.rolesFeaturesService.roles());

	orgRoles: Signal<OrgRole[]> = computed(() =>
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
