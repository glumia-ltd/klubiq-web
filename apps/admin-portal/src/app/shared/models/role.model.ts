export interface CommonDataModel {
	id?: number;
	name?: string;
	alias?: string;
	description?: string;
}
export interface Role {
	id?: number;
	name?: string;
	description?: string;
}
export interface OrgRole extends Role {
	featurePermissions: FeaturePermission[];
}

export interface FeaturePermission {
	featurePermissionId: number;
	alias: string;
	description?: string;
	permission: Permission;
	feature: Feature;
}

export interface Permission extends CommonDataModel {}

export interface Feature extends CommonDataModel {}

export interface UpdateOrgRole extends CommonDataModel {
	oldFeaturePermissionIds: number[];
	newFeaturePermissionIds: number[];
}

export interface CreateOrgRole extends CommonDataModel {
	featurePermissionIds: number[];
}
