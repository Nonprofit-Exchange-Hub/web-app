export type Asset = {
    id: number,
    title: string,
    categories: string[],
    datePosted: string,
    location: string,
    imgUrls: string[],
    description: string,
    postedBy: User,
    //optional organization_id to be filled here, for now using string as placeholder
    organization: string,
};

export type User = {
    id: number,
    firstName: string,
};

export type Transaction = {
    id: number,
    donater: User,
    requester: User,
    asset: Pick<Asset, 'id' | 'title'>,
};

export type Message = {
    id: number,
    text: string,
    transactionId: number,
    user: User,
};

export type Option = {
    value: string,
    text: string,
};

export type TextLink = {
    url: string,
    text: string,
};
