import React, { useState, useEffect } from 'react';
import config from '../config'
const baseURL = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

const useUsersList=()=>{
    const [nameList, setNameList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateUsers = ()=>{setUpdate(update+1);};

    console.log(React);

    //pull user name lookup list
    useEffect(()=>{
        let urlNames = `${baseURL}/users`;
        fetch(urlNames)
        .then((res) => res.json())
        .then((data) => {
            setNameList(data);
        })
        .catch(err => console.log(`useUserList: ${err}`));
    },[update])

    return [nameList, setNameList, updateUsers];

}

export default useUsersList;