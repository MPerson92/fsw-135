import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

export default function User(props) {
    const initState = { user: {}, token: "" }
    const [userState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials).then (res => console.log(res))
        .catch (err => console.log(err.response.data.errMsg))
    };

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then (res => console.log(res))
            .catch (err => console.dir(err.response.data.errMsg))
    };

    return (
        <UserContext.Provider value={ { ...userState, signup, login} }>
            { props.children }
        </UserContext.Provider>
    );
}