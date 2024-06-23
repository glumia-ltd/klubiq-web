export interface Role {
	id?: string;
	name?: string;
	description?: string;
}
export interface OrgRole extends Role {
	permissions: string[];
}
