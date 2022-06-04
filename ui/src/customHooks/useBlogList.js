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

    
    useEffect(() => {     
        let indexList = nameList.map((entry)=>entry.id);    
        
        setCombinedList(postList.map((entry)=>{
                
                let result = {...entry,user_info:{username:"ERROR"}}
                let index = indexList.findIndex(entry.users_id);
                if(index>=0){
                    result.user_info = {...nameList[index]};
                }
                return result;
            }))
    }, [postList, nameList]);


    return [combinedList, setCombinedList, updateBlogFn];
}

// import PropTypes from 'prop-types';
// useBloglist.propTypes = {
//   setNameList: PropTypes.func,
//   updateUsers: PropTypes.func,
// }

export default useBloglist;