//https://codesandbox.io/s/signupregistration-form-reactmaterialui-fr71m?file=/src/components/Registration.jsx:0-7111
import React, { useState, useEffect} from "react";
//import { withStyles } from "@material-ui/core/styles";
//import { register } from "./RegistrationStyles";
import InputAdornment from '@mui/material/InputAdornment';
import { Paper, Avatar, Modal, FormControl, Input, InputLabel, Button } from "@mui/material/";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Icon from "@mui/material/Icon";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import './EntryForms.css'

const Registration = ({open, setOpen,createFn})=>{

    const [userParams, setUserParams] = useState({
      username:"",
      firstname:"",
      lastname:"",
      password:"",
      passwordConfirm:""
    })
    
    const [hidePassword, setHidePassword] = useState( true)
    const [error, setError] = useState( null)
    const [errorOpen, setErrorOpen] = useState( false)
    const [entryIsValid, setEntryIsValid] = useState(false);

  
  const handleClose = () => {
    setOpen(false);
  };

  const errorClose = e => {
    setErrorOpen(false)
  };

  
  const handleChange = e => {
    setUserParams(() => ({
      ...userParams,           // copy all other field/objects
        [e.target.getAttribute('name')]: e.target.value    // overwrite the value of the field to update
      
    }));
  };



  const showPassword = () => {
    setHidePassword( !hidePassword );
  };

  
  useEffect(()=>{

    if (userParams.username === "") {
      setEntryIsValid(true);
    }else{
    setEntryIsValid(false);
    }

  },[userParams]) 
  
  const submitRegistration = e => {
    e.preventDefault();
    if (!(userParams.password === userParams.passwordConfirm)) {
        setErrorOpen(true);
        setError("Passwords don't match");
    }

    let newUserCredentials = {
      username: userParams.username,
      firstname:userParams.firstname,
      lastname:userParams.lastname,
      password: userParams.password //update to hash on later revision
    };
    
    //dispath to userActions
    createFn(newUserCredentials);

    handleClose();
  };

    return ( <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}>
      <div className="Registration">
        {/* <CssBaseline /> */}

        <Paper className="paper">
          <Avatar className="avatar">
            <PeopleAltIcon className="icon" />
          </Avatar>
          <form
            className="form"
            onSubmit={submitRegistration}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username" className="labels">
                username
              </InputLabel>
              <Input
                name="username"
                type="username"
                autoComplete="username"
                className="inputs"
                disableUnderline={true}
                inputProps={{ maxLength: 20 }}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="firstname" className="labels">
                First Name
              </InputLabel>
              <Input
                name="firstname"
                type="firstname"
                autoComplete="firstname"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="lastname" className="labels">
                Last Name
              </InputLabel>
              <Input
                name="lastname"
                type="lastname"
                autoComplete="lastname"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className="labels">
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className="inputs"
                disableUnderline={true}
                onChange={handleChange}
                type={hidePassword ? "password" : "input"}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfirm" className="labels">
                Confirm password
              </InputLabel>
              <Input
                name="passwordConfirm"
                autoComplete="passwordConfirm"
                className="inputs"
                disableUnderline={true}
                onClick={showPassword}
                onChange={handleChange}
                type={hidePassword ? "password" : "input"}
                endAdornment={
                  hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityIcon
                        fontSize="default"
                        className="passwordEye"
                        onClick={showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={entryIsValid}
              disableRipple
              fullWidth
              variant="outlined"
              className="button"
              type="submit"
              onClick={submitRegistration}
            >
              Join
            </Button>
            <Button
            disableRipple
            fullWidth
            variant="outlined"
            className="button"
            type="submit"
            onClick={handleClose}
                >Cancel</Button>
          </form>

          {error ? (
            <Snackbar
              variant="error"
              key={error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={errorOpen}
              onClose={errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className="error"
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {error} </span>
                  </div>
                }
                action={[
                  <Icon
                    key="close"
                    aria-label="close"
                    onClick={errorClose}
                  >
                    <CloseIcon color="error" />
                  </Icon>
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
      </Modal>
    );
  }


export default Registration;
