export type Asset = {
    id: number,
    title: string,
    categories: string[],
    datePosted: string,
    location: string,
    imgs: string[],
    description: string,
    // TODO postedBy: User,
    postedBy: string,
};
