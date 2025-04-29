import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../services/roles-features.service';
import { Role, OrgRole, CommonDataModel } from '../shared';
import { SystemRolesComponent } from './system-roles/system-roles.component';
import { OrgRolesComponent } from './org-roles/org-roles.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
	selector: 'app-roles-container',
	standalone: true,
	template: ` <p-tabView>
		<p-tabPanel header="System Roles">
			<app-system-roles [roles]="roles()"></app-system-roles>
		</p-tabPanel>
		<p-tabPanel header="Organization Roles">
			<app-org-roles
				[features]="features()"
				[permissions]="permissions()"
				[orgRoles]="orgRoles()"
			></app-org-roles>
		</p-tabPanel>
	</p-tabView>`,
	styles: ``,
	imports: [
		CommonModule,
		MatTabsModule,
		SystemRolesComponent,
		OrgRolesComponent,
		TabViewModule,
	],
})
export class RolesContainerComponent implements OnInit {
	roles: Signal<Role[]> = computed(() => this.rolesFeaturesService.roles());

	orgRoles: Signal<OrgRole[]> = computed(() =>
		this.rolesFeaturesService.orgRoles(),
	);

	features: Signal<CommonDataModel[]> = computed(() =>
		this.rolesFeaturesService.features(),
	);
	permissions: Signal<CommonDataModel[]> = computed(() =>
		this.rolesFeaturesService.permissions(),
	);
	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
	) {
		// this.rolesFeaturesService.getRoles();
		// this.rolesFeaturesService.getOrgRoles();
		// this.rolesFeaturesService.get
	}

	ngOnInit(): void {
		if (!this.roles().length) {
			this.rolesFeaturesService.getRoles();
		}
		if (!this.orgRoles().length) {
			this.rolesFeaturesService.getOrgRoles();
		}
		if (!this.features().length) {
			this.rolesFeaturesService.getFeatures();
		}
		if (!this.permissions().length) {
			this.rolesFeaturesService.getPermissions();
		}
	}
}
