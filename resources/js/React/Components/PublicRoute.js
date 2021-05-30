import React, { useContext } from 'react'
import { UserContext } from "../Contexts/UserContext"
import { Route, Redirect } from "react-router-dom"; 

const PublicRoute = (props) => {
    const {user} = useContext(UserContext);

    const { component: Component, ...rest } = props;

    if(!user){
        return ( 
            <Route {...rest} render={
                (props) => (<Component {...props}/>)
            }
            />
        )
    }

    //redirect if user is loged in 
    return <Redirect to='/' />
}


export default PublicRoute
