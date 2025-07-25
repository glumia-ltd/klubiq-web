import { TenantProfileType } from "../../shared/auth-types";
import { Lease } from "../leases/list-page.type";
export type Summary = {
    totalLeases: number;
    activeLeases: number;
    inactiveLeases: number;
    totalRent: number;
  };
  export type AccountInvitation = {
    id: string;
    status: string;
    invitationDate: string;
  };
  export type Document = {
    id: string;
    name: string;
    url: string;
    createdDate: string;
  };
export type TenantDetailsType = {
    profile: TenantProfileType;
	summary: Summary;
	activeLeases: Lease[];
	inactiveLeases: Lease[];
	accountInvitation: AccountInvitation;
    documents: Document[];
}
