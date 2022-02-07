import { LinkPage } from '../../../assets/sharedComponents/Forms';
import { TextLink } from '../../../types';

const links: TextLink[] = [
  {
    url: '/need/goods/',
    text: 'Goods',
  },
  {
    url: '/need/volunteers',
    text: 'Volunteers',
  },
];

function NeedForm() {
  return <LinkPage title="What do you need?" links={links} />;
}

export default NeedForm;
