import React, { useState, useEffect } from 'react';
import useUsersList from './useUsersList';

import config from '../config'
const baseURL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;



const useBloglist = () => {
    const [postList, setPostList] = useState([]);
    const [nameList, setNameList, updateUsers] = useUsersList();
    const [combinedList, setCombinedList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateBlogFn = ()=>{setUpdate(update+1);};

    
    
    const [mapNames, setMapNames] = useState({});

    console.log(React,setNameList,updateUsers);    
    //pull total blog list    
    useEffect(()=>{
        let urlPosts = `${baseURL}/posts`;
        fetch(urlPosts)
        .then((res) => res.json())
        .then((data) => {
  
            setPostList(data);
        },(err) => console.log(`useBlogList: ${err}`));
    },[update])  

    
    useEffect(()=>{
        nameList.forEach((entry)=>{
            setMapNames({k:entry.id, v:{firstname:entry.firstname, lastname:entry.lastname, username:entry.username}})
        })
        let accesObject = {};
        for (let i = 0; i < nameList.length; i ++){
            let entry = nameList[i];
            accesObject[entry.id]={firstname:entry.firstname, lastname:entry.lastname, username:entry.username};
        }
        setMapNames(accesObject);
    }, [nameList])
    
    useEffect(() => {     
            setCombinedList(postList.map((entry)=>{
                
                let result = {...entry,user_info:{username:"ERROR"}}
                if(entry.users_id in mapNames){
                    result.user_info = {...mapNames[entry.users_id]};
                }
                return result;
            }))
    }, [postList, mapNames]);


    return [combinedList, setCombinedList, updateBlogFn];
}

// import PropTypes from 'prop-types';
// useBloglist.propTypes = {
//   setNameList: PropTypes.func,
//   updateUsers: PropTypes.func,
// }

export default useBloglist;