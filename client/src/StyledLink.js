import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Styled Link with RouterLink set as component for Browser Router.
 * Sets links to have black text, and default behavior of showing line on hover.
 */

const useStyles = makeStyles(() => {
    return {
        link : {
            color     : '#000000',
            textAlign : 'left'
        }
    };
});

function StyledLink(props) {
    const classes = useStyles();

    return (
        <Link className={classes.link} component={RouterLink} to={props.to}>
            {props.children}
        </Link>
    );
}

export default StyledLink;
