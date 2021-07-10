import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import type { Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({

}));

function SmallDisplayCard() {
    const classes = useStyles();

    return (
        <Card>
            Card
        </Card>
    );
}

export default SmallDisplayCard;
