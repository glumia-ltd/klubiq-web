import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { PropertyMetadataService } from '../services/property-metadata.service';
import {
	PropertyMetadata,
	UpdateMetaData,
} from '../shared/models/property-metadata.model';
import { PropertyCategoriesComponent } from './property-categories.component';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../services/toast.service';

@Component({
	selector: 'app-property-metadata-container',
	standalone: true,
	providers: [PropertyMetadataService, ToastService],
	template: `
		<p-toast />
		<div class="flex flex-column gap-1">
			<h1 class="text-4xl">Property Metadata</h1>
			<p-tabView [activeIndex]="0">
				@if (this.categories().length > 0) {
					<p-tabPanel header="Property Categories">
						<app-property-categories
							[categories]="categories()"
							(categoryChange)="updateCategory($event)"
						></app-property-categories>
					</p-tabPanel>
				}
				@if (this.purposes().length > 0) {
					<p-tabPanel header="Property Purposes">
						{{ purposes() }}
					</p-tabPanel>
				}
				@if (this.types().length > 0) {
					<p-tabPanel header="Property Types">
						{{ types() }}
					</p-tabPanel>
				}

				@if (this.statuses().length > 0) {
					<p-tabPanel header="Property Statuses">
						{{ statuses() }}
					</p-tabPanel>
				}

				@if (this.amenities().length > 0) {
					<p-tabPanel header="Property Amenities">
						{{ amenities() }}
					</p-tabPanel>
				}
			</p-tabView>
		</div>
	`,
	styles: ``,
	imports: [
		CommonModule,
		MatTabsModule,
		TabViewModule,
		PropertyCategoriesComponent,
		ToastModule,
	],
})
export class PropertyMetadataComponent implements OnInit {
	categories: Signal<PropertyMetadata[]> = computed(() =>
		this.propertyMetadataService.categories(),
	);
	types: Signal<PropertyMetadata[]> = computed(() =>
		this.propertyMetadataService.types(),
	);
	statuses: Signal<PropertyMetadata[]> = computed(() =>
		this.propertyMetadataService.statuses(),
	);
	purposes: Signal<PropertyMetadata[]> = computed(() =>
		this.propertyMetadataService.purposes(),
	);
	amenities: Signal<PropertyMetadata[]> = computed(() =>
		this.propertyMetadataService.amenities(),
	);
	constructor(
		private router: Router,
		private propertyMetadataService: PropertyMetadataService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		if (!this.categories().length) {
			this.propertyMetadataService.getCategories();
		}
		if (!this.types().length) {
			this.propertyMetadataService.getTypes();
		}
		if (!this.statuses().length) {
			this.propertyMetadataService.getStatuses();
		}
		if (!this.purposes().length) {
			this.propertyMetadataService.getPurposes();
		}
		if (!this.amenities().length) {
			this.propertyMetadataService.getAmenities();
		}
	}

	updateCategory(category: PropertyMetadata) {
		console.log('Category Update: ', category);
		if (category?.id !== undefined) {
			const updateDatData: UpdateMetaData = {
				name: category.name,
				displayText: category.displayText,
				metaData: category?.metaData,
			};
			this.propertyMetadataService
				.updateCategory(category.id, updateDatData)
				.then(() => {
					this.toastService.showSuccess('Category updated successfully');
				})
				.catch((err) => {
					this.toastService.showError(
						`Failed to update Category due to ${err.message}`,
					);
				});
		}
	}
}
