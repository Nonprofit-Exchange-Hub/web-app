import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle'


class SimpleSnackbar extends React.Component{

    state={
        open:false,
    }

    handleClick = () =>{
        this.setState({open:true})
    }
    handleClose = () =>{
        debugger
    }

    render(){
        return(
            <div>
                <Button onClick={this.handleClick}> Run test </Button>
                <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                open={this.state.open}
                autoHideDuration={20}
                action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                >
                  <CloseIcon />
                </IconButton>,
              ]}
                message={<span id="message-id">You claimed this! </span>}
                />
            </div>
        )
    }
}

export default SimpleSnackbar;
