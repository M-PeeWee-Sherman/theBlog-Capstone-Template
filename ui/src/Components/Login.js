//https://codesandbox.io/s/login-form-material-ui-u1xjl?file=/src/App.js:0-1082
//converted from class to function style
import React, { useState } from "react";
import { Avatar, Paper, Modal, FormControl, Input, InputLabel, InputAdornment, Button } from "@mui/material/";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import './EntryForms.css' 

const Login = ({open, setOpen,loginFn})=>{
  const [loginInfo, setLoginInfo] = useState({username:"",password:""});
  const [hidePassword, setHidePassword] = useState( true)

  const showPassword = () => {
    setHidePassword( !hidePassword );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setLoginInfo(() => ({
      ...loginInfo,           // copy all other field/objects
        [e.target.getAttribute('name')]: e.target.value    // overwrite the value of the field to update
      
    }));
  };

  const submitLogin = (e)=>{
      e.preventDefault();
      //window.alert(`username:${loginInfo.username}--password:${loginInfo.password}`)
      loginFn({username:loginInfo.username, password:loginInfo.password})
    }

    return (<Modal
        hideBackdrop
        open={open}
        onClose={handleClose}>
          <Paper className="paper">
          <Avatar className="avatar">
            <PeopleAltIcon className="icon" />
          </Avatar>
          <form
            className="form"
            onSubmit={submitLogin}
          >
          <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username" className="labels">
                username
              </InputLabel>
              <Input
                name="username"
                autoComplete="username"
                className="inputs"
                disableUnderline={true}
                inputProps={{ maxLength: 20 }}
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

            <Button
              disableRipple
              fullWidth
              variant="outlined"
              className="button"
              type="submit"
            onClick={submitLogin}>
            Log in
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
          </Paper>
        </Modal>
    );
  
}
export default Login;