import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <Paper>
                    <Typography variant="h2" component="h1">
                        Support local nonprofits through the giving economy.
                    </Typography>
                </Paper>
            </header>
        </div>
    );
}

export default Home;
