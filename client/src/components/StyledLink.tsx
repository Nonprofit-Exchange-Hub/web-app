import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';

/**
 * Styled Link with RouterLink set as component for Browser Router.
 * Sets links to have black text, and default behavior of showing line on hover.
 */

const useStyles = makeStyles()(() => {
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
}

function StyledLink({ to, target, children }: React.PropsWithChildren<Props>): JSX.Element {
  const { classes } = useStyles();

  return (
    <Link
      className={classes.link}
      component={RouterLink}
      to={to}
      target={target}
      underline={'hover'}
    >
      {children}
    </Link>
  );
}

export default StyledLink;
