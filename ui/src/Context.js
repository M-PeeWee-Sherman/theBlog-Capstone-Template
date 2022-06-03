import React from "react";

const AuthContext = React.createContext([ {AuthId:0,PWHash:""}, () => { } ]);
export default AuthContext;