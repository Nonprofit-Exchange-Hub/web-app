export type Asset = {
  id: number;
  title: string;
  categories: string[];
  datePosted: string;
  location: string;
  imgUrls: string[];
  description: string;
  postedBy: User;
  organization: number;
};

export type User = {
  id: number;
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
