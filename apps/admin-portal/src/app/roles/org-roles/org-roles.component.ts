import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../../services/roles-features.service';
import { CommonDataModel, FeaturePermission, OrgRole } from '../../shared';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-org-roles',
	standalone: true,
	template: ` <p-toast />
		<p-table
			[value]="orgRoles"
			dataKey="id"
			editMode="row"
			[expandedRowKeys]="expandedRows"
			responsiveLayout="scroll"
		>
			<ng-template pTemplate="caption">
				<div class="flex flex-wrap justify-content-end gap-2">
					<p-button
						label="Expand All"
						icon="pi pi-plus"
						text
						(onClick)="expandAll()"
					/>
					<p-button
						label="Collapse All"
						icon="pi pi-minus"
						text
						(onClick)="collapseAll()"
					/>
				</div>
			</ng-template>
			<ng-template pTemplate="header">
				<tr>
					<th style="width:5%"></th>
					<th style="width:20%">Name</th>
					<th style="width:20%">Description</th>
					<th style="width:20%"></th>
				</tr>
			</ng-template>
			<ng-template
				pTemplate="body"
				let-role
				let-editing="editing"
				let-ri="rowIndex"
				let-expanded="expanded"
			>
				<tr [pEditableRow]="role">
					<td>
						<p-button
							type="button"
							pRipple
							[pRowToggler]="role"
							[text]="true"
							[rounded]="true"
							[plain]="true"
							[icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
						/>
					</td>
					<td>
						{{ role.name }}
					</td>
					<td>
						<p-cellEditor>
							<ng-template pTemplate="input">
								<input pInputText type="text" [(ngModel)]="role.description" />
							</ng-template>
							<ng-template pTemplate="output">
								{{ role.description }}
							</ng-template>
						</p-cellEditor>
					</td>
					<td>
						<div class="flex align-items-center justify-content-center gap-2">
							<button
								*ngIf="!editing"
								pButton
								pRipple
								type="button"
								pInitEditableRow
								icon="pi pi-pencil"
								(click)="onRowEditInit(role)"
								class="p-button-rounded p-button-text"
							></button>
							<button
								*ngIf="editing"
								pButton
								pRipple
								type="button"
								pSaveEditableRow
								icon="pi pi-check"
								(click)="onRowEditSave(role)"
								class="p-button-rounded p-button-text p-button-success mr-2"
							></button>
							<button
								*ngIf="editing"
								pButton
								pRipple
								type="button"
								pCancelEditableRow
								icon="pi pi-times"
								(click)="onRowEditCancel(role, ri)"
								class="p-button-rounded p-button-text p-button-danger"
							></button>
						</div>
					</td>
				</tr>
			</ng-template>
			<ng-template pTemplate="rowexpansion" let-role let-index="rowIndex">
				<tr>
					<td colspan="4">
						<div class="p-3">
							<h4>{{ role.name }} role features and permissions mapping</h4>
							<p-table
								[value]="role.featurePermissions"
								dataKey="featurePermissionId"
								editMode="row"
								responsiveLayout="scroll"
							>
								<ng-template pTemplate="header">
									<tr>
										<th style="width:20%">Alias</th>
										<th style="width:20%">Feature</th>
										<th style="width:20%">Permission</th>
										<th style="width:20%"></th>
									</tr>
								</ng-template>
								<ng-template
									pTemplate="body"
									let-featurePermission
									let-editing="editing"
									let-ri="rowIndex"
								>
									<tr [pEditableRow]="featurePermission">
										<td>
											<p-cellEditor>
												<ng-template pTemplate="input">
													<input
														pInputText
														type="text"
														[(ngModel)]="featurePermission.alias"
													/>
												</ng-template>
												<ng-template pTemplate="output">
													{{ featurePermission.alias }}
												</ng-template>
											</p-cellEditor>
										</td>
										<td>
											{{ featurePermission.feature.name }}
										</td>
										<td>
											{{ featurePermission.permission.name }}
										</td>

										<td>
											<div
												class="flex align-items-center justify-content-center gap-2"
											>
												<button
													*ngIf="!editing"
													pButton
													pRipple
													type="button"
													pInitEditableRow
													icon="pi pi-pencil"
													(click)="onExpandedRowEditInit(featurePermission)"
													class="p-button-rounded p-button-text"
												></button>
												<button
													*ngIf="editing"
													pButton
													pRipple
													type="button"
													pSaveEditableRow
													icon="pi pi-check"
													(click)="
														onExpandedRowEditSave(role.id, featurePermission)
													"
													class="p-button-rounded p-button-text p-button-success mr-2"
												></button>
												<button
													*ngIf="editing"
													pButton
													pRipple
													type="button"
													pCancelEditableRow
													icon="pi pi-times"
													(click)="
														onExpandedRowEditCancel(
															role.id,
															ri,
															featurePermission
														)
													"
													class="p-button-rounded p-button-text p-button-danger"
												></button>
											</div>
										</td>
									</tr>
								</ng-template>
							</p-table>
						</div>
					</td>
				</tr>
			</ng-template>
		</p-table>`,
	styles: ``,
	providers: [ToastService, RolesFeaturesService],
	imports: [
		CommonModule,
		MatTableModule,
		TableModule,
		ButtonModule,
		InputTextModule,
		FormsModule,
		ToastModule,
	],
})
export class OrgRolesComponent implements OnInit {
	expandedRows: Record<number, boolean> = {};
	@Input() orgRoles!: OrgRole[];
	@Input() permissions!: CommonDataModel[];
	@Input() features!: CommonDataModel[];
	clonedRoles: { [s: string]: OrgRole } = {};
	clonedFeaturePermissions: { [s: string]: FeaturePermission } = {};

	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {}

	expandAll() {
		this.expandedRows = this.orgRoles.reduce(
			(rows: Record<number, boolean>, role: OrgRole) => {
				if (role.id) {
					rows[role.id] = true;
				}
				return rows;
			},
			{},
		);
	}
	onExpandedRowEditInit(featurePermission: FeaturePermission) {
		//this.clonedRoles[role.id as number] = { ...role };
		this.clonedFeaturePermissions[
			featurePermission.featurePermissionId as number
		] = { ...featurePermission };
	}

	onExpandedRowEditSave(roleId: number, featurePermission: FeaturePermission) {
		if (featurePermission?.alias?.trim()) {
			delete this.clonedFeaturePermissions[
				featurePermission.featurePermissionId as number
			];
			//this.rolesFeaturesService.updateRole(roles);
		}
	}

	onExpandedRowEditCancel(
		roleId: number,
		index: number,
		featurePermission: FeaturePermission,
	) {
		const role = this.orgRoles.find((role) => role.id === roleId);
		if (role) {
			role.featurePermissions[index] =
				this.clonedFeaturePermissions[
					featurePermission.featurePermissionId as number
				];
		}
		delete this.clonedFeaturePermissions[
			featurePermission.featurePermissionId as number
		];
	}

	onRowEditInit(role: OrgRole) {
		this.clonedRoles[role.id as number] = { ...role };
	}

	onRowEditSave(role: OrgRole) {
		if (role?.description?.trim()) {
			delete this.clonedRoles[role.id as number];
			//this.rolesFeaturesService.updateRole(roles);
		}
	}

	onRowEditCancel(role: OrgRole, index: number) {
		this.orgRoles[index] = this.clonedRoles[role.id as number];
		delete this.clonedRoles[role.id as number];
	}
	collapseAll() {
		this.expandedRows = {};
	}
}
