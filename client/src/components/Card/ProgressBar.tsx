import { makeStyles } from 'tss-react/mui';

type Props = {
  progress: number;
};
// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. ArrowFunctionExpression in CSS prop.
const useStyles = makeStyles<{ progress: number }>()((_theme, { progress }) => ({
  container: {
    width: '10em',
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    width: `${progress}%`,
    height: '100%',
    backgroundColor: '#43AFBF',
  },
}));

export default function ProgressBar(props: Props) {
  const { classes } = useStyles({ progress: props.progress });

  return (
    <div className={classes.container}>
      <div className={classes.fill} />
    </div>
  );
}
