import { LinkPage } from '../../../assets/sharedComponents/Forms';
import { TextLink } from '../../../types';
// import routes from '../../../routes';

const links: TextLink[] = [
  {
    url: '/need/goods',
    // url: routes.NeedFormGoods.path,
    text: 'Goods',
  },
  {
    url: '/need/volunteers',
    // url: routes.NeedFormVolunteers.path,
    text: 'Volunteers',
  },
];

function NeedForm() {
  return <LinkPage title="What do you need?" links={links} />;
}

export default NeedForm;
