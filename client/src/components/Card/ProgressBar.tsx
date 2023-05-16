import makeStyles from '@mui/styles/makeStyles';

type Props = {
  progress: number;
};
const useStyles = makeStyles(() => ({
  container: {
    width: '10em',
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    width: (props: Props) => {
      return `${props.progress}%`;
    },
    height: '100%',
    backgroundColor: '#43AFBF',
  },
}));

export default function ProgressBar(props: Props) {
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <div className={classes.fill} />
    </div>
  );
}
