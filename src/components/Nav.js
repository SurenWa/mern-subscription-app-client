import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context';

const Nav = () => {
    const [state, setState] = useContext(UserContext)
    const history = useNavigate();

    const logout = () => {
        setState({ user: {}, token: "" })
        localStorage.removeItem('auth')
        history("/login")
    }

    //console.log("STATE =>", state)
    return (
        <ul className="nav border">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                    Home
                </Link>
            </li>

            {state && state.token ? (
                <div className='nav-item dropdown'>
                    <li
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        {state.user.email}
                    </li>
                    <ul className="dropdown-menu">
                        <li className="nav-item dropdown-item">
                            <Link className="nav-link" to="/account">
                                Account
                            </Link>

                            <div 
                                className="nav-link" onClick={logout} style={{cursor: 'pointer'}}>
                                Logout
                            </div>
                        </li>                        
                    </ul>
                </div>

                
            ) : (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                </>
            )}

        </ul>

    )
}

export default Nav

