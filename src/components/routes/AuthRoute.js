import React, { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { UserContext } from '../../context';

const AuthRoute = ({children}) => {
    const [state, setState] = useContext(UserContext)

    if(!state) {
        return <Navigate to={"/login"} replace />
    }

    return state && state.token ? children : ""
}

export default AuthRoute