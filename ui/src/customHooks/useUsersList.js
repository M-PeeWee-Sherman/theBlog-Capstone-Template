import React, { useState, useEffect } from 'react';
import baseURL from '../baseURL'

const useUsersList=()=>{
    const [nameList, setNameList] = useState([]);
    const [update, setUpdate] = useState(0);
    const updateUsers = ()=>{setUpdate(update+1);};

    //pull user name lookup list
    useEffect(()=>{
        let urlNames = `${baseURL}users`;
        fetch(urlNames)
        .then((res) => res.json())
        .then((data) => {
            setNameList(data);
        });
    },[update])

    return [nameList, setNameList, updateUsers];

}

export default useUsersList;