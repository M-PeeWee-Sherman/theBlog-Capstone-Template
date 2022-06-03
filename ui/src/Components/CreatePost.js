import React, {  useState } from "react";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

const pads = {
    gap :2,
    margin: 2,
    bgcolor:"lightblue"
}

const outerGrid = {
   
    border: 1,
    borderRadius: 2,
    maxWidth: 600,
    
  }

const Post=({disableCreate, users_id, createFn})=> {
    const stamp = new Date().toUTCString();
    const [titleState, setTitleState] = useState("");
    const [contentState, setContentState] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    let handleInputTitleChange=(e)=>{
        setTitleState(e.target.value);
    }
    let handleInputContentChange=(e)=>{
        setContentState(e.target.value);
    }

    return (
        <div align="center">
        <Button disabled={disableCreate} onClick={handleOpen}>Create Post</Button>
        <Modal
            
            hideBackdrop
            open={open}
            onClose={handleClose}
            style={{display:'flex',alignItems:'top',justifyContent:'center'}}>
            <Grid
            container
            sx={{...pads,...outerGrid,}}
            direction="column"
            justifyContent="center"
            alignItems="center"
            variant="outlined" >
                <Grid container 
                sx={{gap:2}}
                direction="row" 
                justifyContent="center"
                alignItems="center"
                > 
                    <TextField
                    id={`title_create`}
                    label="Title"
                    onChange={handleInputTitleChange}
                    value={titleState}
                    sx={{width:'66%'}}/>
                    <Typography sx={{width:'26%', display: 'block' }}>{stamp}</Typography>        
                </Grid> 
                        
                <TextField 
                    id={`content_create`}
                    label="Content" 
                    multiline
                    fillWidth
                    onChange={handleInputContentChange}
                    sx={{...pads, width: '90%'}}
                    variant="outlined"                     
                    value={contentState}
                    />
                <Grid container direction="row" 
                    justifyContent="center"
                    alignItems="center"> 

                        <Button 
                            id={`submitUpdateButton_create`} 
                            onClick={(e)=>{
                                e.preventDefault();
                                createFn({users_id, content:contentState, title:titleState});
                                setContentState("");
                                setTitleState("");
                                handleClose();
                            }}
                            >Submit</Button>
                    <Button
                            onClick={(e)=>{
                                e.preventDefault();
                                handleClose();
                            }}
                    >Cancel</Button> 
                </Grid>
            </Grid></Modal>
            </div>)
}

export default Post;