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
            textAlign: 'left'
        }
    };
});

interface StyledLinkProps {
    to: string;
    children: string;
}

function StyledLink({ to, children }: StyledLinkProps) {
    const classes = useStyles();

    return (
        <Link className={classes.link} component={RouterLink} to={to}>
            {children}
        </Link>
    );
}

export default StyledLink;
