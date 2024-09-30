import { Inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export interface ToastMessage {
	severity: 'error' | 'success' | 'info' | 'warn' | 'contrast' | 'secondary';
	summary: 'Error' | 'Success' | 'Info' | 'Warn' | 'Contrast' | 'Secondary';
	detail: string;
}
// const auth = getAuth();
@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(
		private http: HttpClient,
		private messageService: MessageService,
	) {}

	showSuccess(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}

	showInfo(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}

	showWarning(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}
	showError(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}

	showContrast(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}

	showSecondary(message: string) {
		const toastData: ToastMessage = {
			severity: 'success',
			summary: 'Success',
			detail: message,
		};
		this.messageService.add(toastData);
	}
}
