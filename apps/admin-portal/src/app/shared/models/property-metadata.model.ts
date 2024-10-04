export interface PropertyMetadata {
	id?: number;
	name?: string;
	displayText?: string;
	description?: string;
	metaData?: Record<string, any>;
}
export type UpdateMetaData = Omit<PropertyMetadata, 'id'>;
