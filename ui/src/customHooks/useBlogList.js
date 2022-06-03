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

    //pull total blog list    
    useEffect(()=>{
        let urlPosts = `${baseURL}/posts`;
        fetch(urlPosts)
        .then((res) => res.json())
        .then((data) => {
  
            setPostList(data);
        })
        .catch(err => console.log(`useBlogList: ${err}`));
    },[update])  

    useEffect(() => {     
            let mapNames = new Map();
            nameList.forEach((entry)=>{
                mapNames.set(entry.id,{firstname:entry.firstname, lastname:entry.lastname, username:entry.username})
            })
    
            setCombinedList(postList.map((entry)=>{
                
                let result = {...entry,user_info:{username:"ERROR"}}
                if(mapNames.has(entry.users_id)){
                    result.user_info = {...mapNames.get(entry.users_id)};
                }
                return result;
            }))
    }, [update,postList]);


    return [combinedList, setCombinedList, updateBlogFn];
}

export default useBloglist;