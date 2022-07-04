import { LinkPage } from '../components/Forms';
import { TextLink } from '../types';

const links: TextLink[] = [
  {
    url: '/need/',
    text: 'Share a Need',
  },
  {
    url: '/offer/',
    text: 'Make an Offer',
  },
];

function ActionForm() {
  return <LinkPage title="What would you like to do?" links={links} />;
}

export default ActionForm;
