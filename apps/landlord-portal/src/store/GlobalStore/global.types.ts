export type GenericType = {
	id: number;
	name: string;
};

export type FileUploadResponse = {
	url: string;
	public_id?: string;
	original_filename?: string;
	secure_url?: string;
	format?: string;
	resource_type?: string;
	created_at?: string;
	bytes?: number;
	secure?: boolean;
	version?: number;
	signature?: string;
};
export type FileUploadRequest = {
	files: File[];
	organizationUuid: string;
	organizationName: string;
	rootFolder: string;
}