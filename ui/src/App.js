import React, { useState, useEffect, useReducer } from 'react';

import useUsersList from './customHooks/useUsersList';
import useBloglist from './customHooks/useBlogList';
import CreatePost from './Components/CreatePost';
import PostList from './Components/PostList';
import Login from './Components/Login';
import Registration from './Components/Registration';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from './Context';
import './App.css';
import config from './config'

const baseURL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
  const [nameList, setNameList, updateUsers] = useUsersList();
  console.log(setNameList);
  const [filterNameChoices, setFilteredNameChoices] = useState([]);
  const [fullList, setFullList, updateBlogFn] = useBloglist();
  console.log(setFullList);
  const [filteredList, setFilteredList] = useState([-1]); //filtered blog entries
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [disableCreate, setDisableCreate] = useState(true);
  const [logButtonValue, setLogButtonValue] = useState("Log In")
  const authObjContext = useState({AuthId:0,PW:"",username:"Guest"});
  const [authObj, setAuthObj] = authObjContext;


  let openRegistration = (e) =>{
    e.preventDefault();
    setOpenRegister(true);  }

  const changeView=(state, id)=>{
      let fullObject = filterNameChoices.filter((el)=>(parseInt(el.id)===parseInt(id)))
      let answer = {};
      if (fullObject.length===0){
        answer= {id:0,username:'View All'};
      }else{
        answer= {...fullObject[0]};
      }
      return answer;
  }
  let [currentUserView, setCurrentUserView]= useReducer(changeView, {id:0,username:'View All'}); //asign user id



  const logOut=()=>{
    setLogButtonValue("Log In");
    setAuthObj({AuthId:0,PW:"", username:"Guest"});
    setCurrentUserView(0);

  }


  useEffect( ()=>{
    if(authObj.AuthId>0){setDisableCreate(false)}else{setDisableCreate(true)}
  }
  ,[authObj])


  let submitUpdate = (updateEntry)=>{
    const stamp = new Date().toUTCString();
    
    let bodyData = {id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch(`${baseURL}/posts`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
     console.log(`App.js 79$${res}`)
     updateBlogFn()} , 
      (err) => console.log(`submitUpdate: ${err}`));
  }

  let deleteEntry=(id)=>{
    //console.log(`id is ${id}`)
    fetch(`${baseURL}/posts/${id}`, {
      method: "DELETE", 
    }).then((res)=>{
      console.log(`App.js 90$${res}`)
      updateBlogFn();
      setCurrentUserView(authObj.AuthId);} , 
      (err) => console.log(`deleteEntry: ${err}`))
  }

  let createEntry = (newEntry)=>{

    let bodyData = { users_id:newEntry.users_id,stamp:newEntry.stamp,title:newEntry.title,content:newEntry.content};
    //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
    fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(bodyData)
        
    }).then((res)=>{
      console.log(`App.js 105$${res}`);
      updateBlogFn();
      setCurrentUserView(authObj.AuthId);} , 
     (err) => console.log(`createEntry: ${err}`));
  }

  let openLog = (e) =>{
    e.preventDefault();
    if (logButtonValue==="Log In"){
      setOpenLogin(true);
    }else{
      logOut();
    }
      
  }

  //called on successful login
  useEffect(()=>{
    if (logButtonValue==="Log Out"){
      setOpenLogin(false);
    }
     
  },[logButtonValue ])

  useEffect(()=>{
    let index = filterNameChoices.findIndex((el)=>(el.id===currentUserView.id))
    if(index<0){index=0;}
    document.getElementById("Filter_Dropdown").selectedIndex = index;
  },[currentUserView])

  useEffect(()=>{
    setCurrentUserView(authObj.AuthId);
  },[filterNameChoices])

  let loginUser = (credentials)=>{
   
    fetch(`${baseURL}/login`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(credentials)
          
    }).then((response) => {
      //window.alert(`Fetch Answer REturned ${response}`);
      return response.json()})
      .then((res)=>{
        //  window.alert(res) 
        // window.alert(Object.keys(res))
        // window.alert(res.users_id)
      let idAnswer = parseInt(res.users_id);

      if (idAnswer>0){
        //window.alert(`Answer ${idAnswer}`);
        setAuthObj({AuthId:idAnswer,PW:credentials.password, username:credentials.username});
        setLogButtonValue("Log Out");
        setCurrentUserView(idAnswer);

      }else{
        window.alert("Incorrect username or password");

      }
      
    } , 
    (err) => console.log(`loginUser: ${err}`));

  }
  
  //Registration Submission
  let createUser = (newEntry)=>{
    //window.alert("Create Triggered")

        let credentials = { 
          firstname:newEntry.firstname,
          lastname:newEntry.lastname,
          username:newEntry.username,
          password:newEntry.password,
        }
        
        //window.alert(JSON.stringify({id:updateEntry.id, users_id:updateEntry.users_id,stamp:stamp,title:updateEntry.title,content:updateEntry.content}))
        fetch(`${baseURL}/users`, {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify(credentials)
            
        }).then((response) => {
          //window.alert(`Fetch Answer REturned ${response}`);
          return response.json()})
        .then((res)=>{
          console.log(`App.js 169$${res}`)
          let idAnswer = parseInt(res[0].id);
          
          if (idAnswer>0){
            //window.alert(`Answer ${idAnswer}`);
            setAuthObj({AuthId:idAnswer,PW:credentials.password, username:credentials.username});
            setLogButtonValue("Log Out");
            updateUsers();
            setCurrentUserView(idAnswer);
            }
            
          } , 
          (err) => {
            window.alert(`Registration succes but response timed-out ${err}`)
            console.log(`createUser: ${err}`)});

    

  }


  const handleFilterChange = (event) => {
    //let fullObject = filterNameChoices.filter((el)=>(parseInt(el.id)===parseInt(event.target.value)))
    //if(parseInt(event.target.value)===1){window.alert(`${filterNameChoices[1].id} ?= ${event.target.value} ${fullObject.length} ${Object.keys(fullObject)} ${fullObject.id}`)}
    setCurrentUserView(event.target.value);
  };
  
  //update filter drop down after a new user is registered
  useEffect(()=>{
    setFilteredNameChoices([{id:0,username:'View All'}].concat([...nameList]));
  },[nameList])
  
  //update the lists of displayed posts after a new post is added of the filter view is changed
  useEffect(()=>{   
    setFilteredList([].concat(fullList.filter((element)=>(((currentUserView.id===0) || (element.users_id===currentUserView.id))))));
  },[fullList, currentUserView])
  
  return (
    <div className="App">
      <AuthContext.Provider value={authObjContext}>
      <Grid container spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  variant="outlined" >
        <Grid item xs={3}>
        <Typography variant="h3">TheBlog for {authObj.username}</Typography>
        </Grid>
        <Grid item xs={2}>
          <InputLabel variant="standard" htmlFor="Filter_Dropdown">
            Author Filter
          </InputLabel>
          <NativeSelect
            defaultValue={currentUserView.id}
            inputProps={{
              name: 'filter',
              id: 'Filter_Dropdown',
            }}
            onChange={handleFilterChange}>
              {filterNameChoices.map((el)=>(<option key={`option_${el.id}`} value={el.id}>{el.username}</option>))}

            </NativeSelect>
          </Grid>
            <Grid item xs={2} container direction="column">
            <Button onClick={openRegistration}>Register</Button>            
            <Button onClick={openLog}>{logButtonValue}</Button>
    
            </Grid>
            </Grid>
        <Registration open={openRegister} setOpen={setOpenRegister} createFn={createUser}></Registration>
        <Login open={openLogin} setOpen={setOpenLogin} loginFn={loginUser}></Login>
        
 
      <CreatePost disableCreate={disableCreate} users_id={authObj.AuthId} createFn={createEntry}/>
      <PostList updateFn={submitUpdate} deleteFn={deleteEntry} entryList={filteredList}/>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
