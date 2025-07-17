import { UserProfile } from "@/shared/types/data.types";

export type AuthType = {
	user: UserProfile;
	isAuthenticated: boolean;
};

export type RootState = {
	auth: AuthType;
};

export const API_TAGS = {
    USER: 'User',
	INSIGHTS: 'Insights',
  } as const;
export const ALL_TAGS = Object.values(API_TAGS);