export type Asset = {
    id: number,
    title: string,
    categories: string[],
    datePosted: string,
    location: string,
    imgs: string[],
    description: string,
    postedBy: User,
};

export type User = {
    id: number,
    firstName: string,
};
