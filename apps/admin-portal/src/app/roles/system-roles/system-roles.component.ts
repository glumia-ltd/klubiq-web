import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';
import { RolesFeaturesService } from '../../services/roles-features.service';
import { Role, OrgRole } from '../../shared';

@Component({
	selector: 'app-system-roles',
	standalone: true,
	template: `
		<table mat-table [dataSource]="roles" class="mat-elevation-z8">
			@for (column of columns; track column) {
				<ng-container [matColumnDef]="column.columnDef">
					<th mat-header-cell *matHeaderCellDef>{{ column.header }}</th>
					<td mat-cell *matCellDef="let element">{{ column.cell(element) }}</td>
				</ng-container>
			}
			<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
			<tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
		</table>
	`,
	styles: ``,
	imports: [CommonModule, MatTableModule],
})
export class SystemRolesComponent implements OnInit {
	columns = [
		{
			columnDef: 'name',
			header: 'Name',
			cell: (element: OrgRole) => `${element.name}`,
		},
		{
			columnDef: 'description',
			header: 'Description',
			cell: (element: OrgRole) => `${element.description}`,
		},
	];
	dataSource = this.rolesFeaturesService.orgRoles();
	displayedColumns = this.columns.map((c) => c.columnDef);
	@Input() roles: Role[] = [];

	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
	) {}

	ngOnInit(): void {}
}
