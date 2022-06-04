import  { useState, useEffect } from 'react';

import config from '../config'
const baseURL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;



const useBloglist = () => {
    const [postList, setPostList] = useState([]);
    //const [nameList, setNameList, updateUsers] = useUsersList();
    const [combinedList, setCombinedList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateBlogFn = ()=>{setUpdate(update+1);};
    const [nameList, setNameList] = useState([]);
    //pull total blog list    
    useEffect(()=>{
        let urlNames = `${baseURL}/users`;
        const fetchNames = fetch(urlNames);
        let urlPosts = `${baseURL}/posts`;
        const fetchPosts = fetch(urlPosts);

        Promise.all(fetchNames, fetchPosts)
        .then(([namesRaw, postsRaw]) => [namesRaw.json(),postsRaw.json() ])
        .then(([namesJSON, postsJSON])=>{
               
            setNameList(namesJSON);
            setPostList(postsJSON);
            console.log(nameList,postList);

            let indexList = namesJSON.map((entry)=>entry.id); 
            setCombinedList(postsJSON.map((entry)=>{
            let result = {...entry,user_info:{username:"ERROR"}}
            let index = indexList.findIndex(entry.users_id);
            if(index>=0){
                result.user_info = {...namesJSON[index]};
            }
            return {...result};
        }))
        })
        .catch((e)=>{console.log(`useBLogList Error ${e}`)})

    },[update])  

    return [combinedList, setCombinedList, updateBlogFn];
}

// import PropTypes from 'prop-types';
// useBloglist.propTypes = {
//   setNameList: PropTypes.func,
//   updateUsers: PropTypes.func,
// }

export default useBloglist;