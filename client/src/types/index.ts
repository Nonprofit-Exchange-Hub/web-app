export type Asset = {
    id: number,
    title: string,
    categories: string[],
    datePosted: string,
    location: string,
    imgUrls: string[],
    description: string,
    // TODO postedBy: User,
    postedBy: string,
};
