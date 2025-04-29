import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../../services/roles-features.service';
import { Role, OrgRole } from '../../shared';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';

@Component({
	selector: 'app-system-roles',
	standalone: true,
	template: `
		<p-toast />
		<p-table [value]="roles" dataKey="id" editMode="row">
			<ng-template pTemplate="header">
				<tr>
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
			>
				<tr [pEditableRow]="role">
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
		</p-table>
	`,
	providers: [ToastService, RolesFeaturesService],
	imports: [
		CommonModule,
		TableModule,
		ButtonModule,
		InputTextModule,
		FormsModule,
		ToastModule,
	],
})
export class SystemRolesComponent implements OnInit {
	@Input() roles!: Role[];
	clonedRoles: { [s: string]: Role } = {};

	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {}
	onRowEditInit(role: Role) {
		this.clonedRoles[role.id as number] = { ...role };
	}

	onRowEditSave(role: Role) {
		if (role?.name?.trim()) {
			delete this.clonedRoles[role.id as number];
			//this.rolesFeaturesService.updateRole(roles);
		}
	}

	onRowEditCancel(role: Role, index: number) {
		this.roles[index] = this.clonedRoles[role.id as number];
		delete this.clonedRoles[role.id as number];
	}
}
