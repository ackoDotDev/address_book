import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../Contexts/UserContext";
import Auth from "../Hooks/Auth";

const Navigation = () => {

    const {user} = useContext(UserContext)

    const {logoutUser} = Auth();

    const navLinks = () => {
        if(!user){
            return (
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/login" className="navbar-brand">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="navbar-brand">Register</Link>
                        </li>
                    </ul>
                </div>
            );
        }else{
            return (
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/profile" className="navbar-brand">Profil</Link>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" onClick={logoutUser}>Logout</a>
                        </li>
                    </ul>
                </div>
            );
        }
    }

    return ( 
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>

                {navLinks()}

                
            </div>
        </nav>
    );
}

export default Navigation;