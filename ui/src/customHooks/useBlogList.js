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

    const [mapNames, setMapNames] = useState(new Map());
    const updateMap = (k,v) => {
        setMapNames(new Map(mapNames.set(k,v)));
    }

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
            updateMap(entry.id,{firstname:entry.firstname, lastname:entry.lastname, username:entry.username})
        })
    }, [nameList])
    
    useEffect(() => {     
            setCombinedList(postList.map((entry)=>{
                
                let result = {...entry,user_info:{username:"ERROR"}}
                if(mapNames.has(entry.users_id)){
                    result.user_info = {...mapNames.get(entry.users_id)};
                }
                return result;
            }))
    }, [update,postList, mapNames]);


    return [combinedList, setCombinedList, updateBlogFn];
}

import PropTypes from 'prop-types';
useBloglist.propTypes = {
  setNameList: PropTypes.func,
  updateUsers: PropTypes.func,
}

export default useBloglist;