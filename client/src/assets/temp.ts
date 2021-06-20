import type { Asset } from '../types';


export const placeholderImg = 'https://optinmonster.com/wp-content/uploads/2019/09/nonprofit-newsletter.png';
const otherImg = 'https://s3.amazonaws.com/mentoring.redesign/s3fs-public/styles/aspect_ratio__4_3/public/nonprofit_biz_tool.jpg';

const lorem = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

export const dumbyData: Asset[] = [1, 2, 3].map(num => ({
    id: num,
    title: `Title ${num}`,
    categories: [1, 2, 3].map(n => `category ${n}`),
    datePosted: `datePosted ${num}`,
    location: `location ${num}`,
    imgs: [placeholderImg, otherImg, otherImg],
    description: lorem,
    postedBy: 'User One',
}));

export const filters1 = ['filter 1', 'filter 2', 'filter 3'];
export const filters2 = ['filter 4', 'filter 5', 'filter 6'];
export const filters3 = ['filter 7', 'filter 8', 'filter 9'];
