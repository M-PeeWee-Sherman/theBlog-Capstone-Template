import React, { useEffect, useState} from 'react';
import config from './config'

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App_base() {

  let [names, setNames] = useState([ ]);

  useEffect(() => {
    fetch(ApiUrl + "/authors")
      .then(response => response.json())
      .then(data => setNames(data))
      .catch(err => console.log(err))
  }, []);


  return (
    <div>
      App is running - good work: 
      { names.map(author => author.firstName + " ")}
    </div>
  );
}

export default App_base;
