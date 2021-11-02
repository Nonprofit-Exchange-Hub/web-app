import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles=makeStyles((theme:Theme)=>({
    root:{
        width: '100%',
    },
}))

export default function SimpleSnackbar(){
    const classes=useStyles()
    const [open, setOpen]=React.useState(true)

    const handleClick = () =>{
        setOpen(true)
    }
    const handleClose = (event?: React.SyntheticEvent, reason?: string) =>{
        if(reason=="clickaway"){

        }
        setOpen(false)
    }


        return(
            <div className={classes.root}>
                
                <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
                message={<span id="message-id">You claimed this! </span>}
                />

            </div>
        )

}
