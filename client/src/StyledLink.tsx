import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Styled Link with RouterLink set as component for Browser Router.
 * Sets links to have black text, and default behavior of showing line on hover.
 */

const useStyles = makeStyles(() => {
  return {
    link: {
      color: '#000000',
      textAlign: 'left',
    },
  };
});

interface Props {
  to: string;
  target?: string;
  children: string;
}

function StyledLink({ to, target, children }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Link className={classes.link} component={RouterLink} to={to} target={target}>
      {children}
    </Link>
  );
}

export default StyledLink;
