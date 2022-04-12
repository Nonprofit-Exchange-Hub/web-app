export type Asset = {
  type: string;
  condition: string;
  categories: string[];
  quantity: number;
  id: number;
  title: string;
  description: string;
  poster: User;
  imgUrls: string[];
  location: string;
  datePosted: string;
  organization: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type Organization = {
  id: number;
  name: string;
  description: string;
  website: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  ein: number;
  tax_exempt_id: number;
  users: User[];
  transactions: Transaction[];
  assets: Asset[];
};

export type Transaction = {
  id: number;
  recipient: Organization;
  asset: Asset;
  status: string;
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
