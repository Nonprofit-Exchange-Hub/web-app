import { LinkPage } from '../components/Forms';
import { TextLink } from '../types';

const links: TextLink[] = [
  {
    url: '/offer/goods/',
    text: 'Goods',
  },
  {
    url: '/offer/skills/',
    text: 'Skills',
  },
];

function OfferForm() {
  return <LinkPage title="What are you offering?" links={links} />;
}

export default OfferForm;
