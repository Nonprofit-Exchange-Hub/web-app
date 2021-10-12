import { LinkPage } from './FormElements';
import { TextLink } from './types';

const links: TextLink[] = [
    {
        url: "/need/",
        text: "Share a Need"
    },
    {
        url: "/offer/",
        text: "Make an Offer"
    },
];

function ActionForm() {
    return (
        <LinkPage
            title="What are you offering?"
            links={links}
        />
    );
}

export default ActionForm;