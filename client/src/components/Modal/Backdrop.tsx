import makeStyles from '@mui/styles/makeStyles';

import type { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    backdrop: {
      position: 'absolute',
      width: '100%',
      height: '100vh',
      left: 0,
      top: 0,
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };
});

interface Props {
  onClose: () => boolean;
  children: JSX.Element | JSX.Element[];
}

const Backdrop = ({ children, onClose }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.backdrop} onClick={() => onClose()}>
      Backdrop
    </div>
  );
};
export default Backdrop;
