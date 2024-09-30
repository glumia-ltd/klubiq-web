import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesFeaturesService } from '../services/roles-features.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../services/toast.service';
import { PropertyMetadata } from '../shared/models/property-metadata.model';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface newMetadata {
	label: string;
	value: string;
}
@Component({
	selector: 'app-property-categories',
	standalone: true,
	template: ` <p-toast />
		<p-table
			[value]="categories"
			dataKey="id"
			editMode="row"
			responsiveLayout="scroll"
		>
			<ng-template pTemplate="header">
				<tr>
					<th style="width:20%">Name</th>
					<th style="width:20%">Display Text</th>
					<th style="width:20%">Metadata</th>
					<th style="width:20%"></th>
				</tr>
			</ng-template>
			<ng-template
				pTemplate="body"
				let-category
				let-editing="editing"
				let-ri="rowIndex"
				let-expanded="expanded"
			>
				<tr [pEditableRow]="category">
					<td>
						<p-cellEditor>
							<ng-template pTemplate="input">
								<input pInputText type="text" [(ngModel)]="category.name" />
							</ng-template>
							<ng-template pTemplate="output">
								{{ category.name }}
							</ng-template>
						</p-cellEditor>
					</td>
					<td>
						<p-cellEditor>
							<ng-template pTemplate="input">
								<input
									pInputText
									type="text"
									[(ngModel)]="category.displayText"
								/>
							</ng-template>
							<ng-template pTemplate="output">
								{{ category.displayText }}
							</ng-template>
						</p-cellEditor>
					</td>
					<td>
						<div class="flex flex-column gap-1 pt-1 pb-1">
							@for (item of getCategoryMetadata(category); track $index) {
								<p-cellEditor>
									<ng-template pTemplate="input">
										<p-inputGroup>
											<p-inputGroupAddon>{{ item.key }}</p-inputGroupAddon>
											<input
												pInputText
												type="text"
												[(ngModel)]="category.metaData[item.key]"
											/>
										</p-inputGroup>
									</ng-template>
									<ng-template pTemplate="output">
										<span class="font-bold">{{ item.key }}: </span>
										{{ item.value }}
									</ng-template>
								</p-cellEditor>
							}
						</div>

						<div class="flex flex-row gap-1">
							<input
								id="md-key"
								placeholder="key"
								type="text"
								pInputText
								[(ngModel)]="newMetadata[category.id].label"
							/>
							<input
								id="md-value"
								placeholder="value"
								type="text"
								pInputText
								[(ngModel)]="newMetadata[category.id].value"
							/>
							<button
								*ngIf="
									newMetadata[category.id].label.trim().length > 0 &&
									newMetadata[category.id].value.trim().length > 0 &&
									!editing
								"
								pButton
								pRipple
								type="button"
								pSaveEditableRow
								icon="pi pi-check"
								(click)="addMetaData(category)"
								class="p-button-rounded p-button-text p-button-success mr-2"
							></button>
							<button
								*ngIf="
									newMetadata[category.id].label.trim().length > 0 &&
									newMetadata[category.id].value.trim().length > 0 &&
									!editing
								"
								pButton
								pRipple
								type="button"
								pCancelEditableRow
								icon="pi pi-times"
								(click)="cancelAddMetaData(category)"
								class="p-button-rounded p-button-text p-button-danger"
							></button>
						</div>
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
								(click)="onRowEditInit(category)"
								class="p-button-rounded p-button-text"
							></button>
							<button
								*ngIf="editing"
								pButton
								pRipple
								type="button"
								pSaveEditableRow
								icon="pi pi-check"
								(click)="onRowEditSave(category)"
								class="p-button-rounded p-button-text p-button-success mr-2"
							></button>
							<button
								*ngIf="editing"
								pButton
								pRipple
								type="button"
								pCancelEditableRow
								icon="pi pi-times"
								(click)="onRowEditCancel(category, ri)"
								class="p-button-rounded p-button-text p-button-danger"
							></button>
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
		InputGroupModule,
		InputGroupAddonModule,
	],
})
export class PropertyCategoriesComponent implements OnInit {
	expandedRows: Record<number, boolean> = {};
	@Input() categories!: PropertyMetadata[];
	@Output() categoryChange = new EventEmitter<PropertyMetadata>();
	newMetadata!: Record<number, newMetadata>;
	clonedCategories: { [s: string]: PropertyMetadata } = {};

	constructor(
		private router: Router,
		private rolesFeaturesService: RolesFeaturesService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.newMetadata = this.categories.reduce(
			(acc, category) => {
				acc[category.id as number] = { label: '', value: '' };
				return acc;
			},
			{} as Record<number, newMetadata>,
		);
	}

	onRowEditInit(category: PropertyMetadata) {
		this.clonedCategories[category.id as number] = { ...category };
	}

	getCategoryMetadata(category: PropertyMetadata) {
		if (category?.metaData) {
			return Object.entries(category.metaData).map(([key, value]) => ({
				key,
				value,
			}));
		}
		return [];
	}

	onRowEditSave(category: PropertyMetadata) {
		if (category?.displayText?.trim() || category?.name?.trim()) {
			delete this.clonedCategories[category.id as number];
			this.categoryChange.emit(category);
		}
	}

	onRowEditCancel(category: PropertyMetadata, index: number) {
		this.categories[index] = this.clonedCategories[category.id as number];
		delete this.clonedCategories[category.id as number];
	}
	addMetaData(category: PropertyMetadata) {
		const metaData = this.newMetadata[category.id as number];
		const boolValues = ['true', 'false'];
		if (metaData?.label.trim() && metaData?.value.trim()) {
			if (category && category.metaData) {
				category.metaData[metaData.label] = boolValues.includes(
					metaData.value.toLocaleLowerCase(),
				)
					? metaData.value === 'true'
						? true
						: false
					: (metaData.value as number | string);
			} else {
				category.metaData = {};
				category.metaData[metaData.label] = boolValues.includes(
					metaData.value.toLocaleLowerCase(),
				)
					? metaData.value === 'true'
						? true
						: false
					: (metaData.value as number | string);
			}
			this.categoryChange.emit(category);
			this.newMetadata[category.id as number].label = '';
			this.newMetadata[category.id as number].value = '';
		}
		console.log('Category Metadata: ', category);
	}
	cancelAddMetaData(category: PropertyMetadata) {
		const metaData = this.newMetadata[category.id as number];
		if (category?.metaData) {
			delete category.metaData[metaData.label];
		}
		this.newMetadata[category.id as number].label = '';
		this.newMetadata[category.id as number].value = '';
	}
}
