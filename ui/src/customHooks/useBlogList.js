import React, { useState, useEffect } from 'react';
import baseURL from '../baseURL'
import useUsersList from './useUsersList';



const useBloglist = () => {
    const [postList, setPostList] = useState([]);
    const [nameList, setNameList, updateUsers] = useUsersList();
    const [combinedList, setCombinedList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateBlogFn = ()=>{setUpdate(update+1);};

    //pull total blog list    
    useEffect(()=>{
        let urlPosts = `${baseURL}posts`;
        fetch(urlPosts)
        .then((res) => res.json())
        .then((data) => {
  
            setPostList(data);
        });
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