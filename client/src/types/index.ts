/* eslint-disable no-unused-vars */
export type Asset = {
  id: number;
  title: string;
  categories: string[];
  datePosted: string;
  location: string;
  imgUrls: string[];
  description: string;
  poster: User;
  organization: number;
};

export type Organization = {
  id?: number;
  name: string;
  doing_business_as: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  ein: string;
  nonprofit_classification: string;
};

export type UserOrg = {
  id?: number;
  approvalStatus: ApprovalStatus;
  role: Role;
};

export type UserOrgCreateObj = {
  organization: { id: number };
  user: { id: number };
  approvalStatus: ApprovalStatus;
  role: Role;
};

export enum Role {
  admin = 'ADMIN',
  owner = 'OWNER',
  revoked = 'REVOKED',
}

export enum ApprovalStatus {
  approved = 'APPROVED',
  pending = 'PENDING',
  denied = 'DENIED',
}

export type BaseUserEntity = User & {
  last_name: string;
  email: string;
};

export type User = {
  id?: number;
  firstName: string;
};

export type Transaction = {
  id: number;
  donater: User;
  requester: User;
  asset: Pick<Asset, 'id' | 'title'>;
};

export type Message = {
  id: number;
  text: string;
  transactionId: number;
  user: User;
};

export type Option = {
  id?: string;
  text: string;
  value: string;
};

export type TextLink = {
  url: string;
  text: string;
};

export type Category = {
  id: number;
  name: string;
  applies_to_assets: boolean;
  applies_to_organizations: boolean;
};
