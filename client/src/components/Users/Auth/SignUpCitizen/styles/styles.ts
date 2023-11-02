import { makeStyles } from 'tss-react/mui';
import { placeholderImg } from '../../../../../assets/temp';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const useStyles = makeStyles()((theme) => ({
  sideImg: {
    backgroundImage: `url("${placeholderImg}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    borderTopRightRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  signUpContainer: {
    margin: theme.spacing(5),
  },
  button: {
    borderRadius: 0,
    height: 44,
    textTransform: 'none',
    backgroundColor: '#C4C4C4',
    color: 'white',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '40px',
  },
  subHeader: {
    fontWeight: '600',
    paddingBottom: 0,
  },
  text: {
    fontWeight: '400',
    paddingBottom: '40px',
  },
  input: {
    height: 44,
    border: '1px solid #C4C4C4',
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  chip: {
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    height: 44,
  },
  error: {
    border: '1px solid red',
  },
  selectedChip: {
    backgroundColor: '#C4C4C4',
  },
  select: {
    position: 'relative',
    top: 1,
    height: 44,
    // border: '1px solid #C4C4C4',
    borderColor: '#C4C4C4',
    borderRadius: 10,
    boxSizing: 'border-box',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 14,
    marginBottom: 20,
  },
  link: {
    background: 'none',
    border: 'none',
    padding: '0',
    font: 'inherit',
    cursor: 'pointer',
    textDecoration: 'underline',
    color: 'inherit',
    ':hover': {
      fontWeight: 'bold',
    },
  },
}));
