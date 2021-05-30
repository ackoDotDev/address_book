import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import Loading from './../Components/Loading';

const PrivateRoute = (props) => {
    const { user, isLoading } = useContext(UserContext);
    
    const { component: Component, userType, ...rest } = props;
    if(isLoading) {
        return <Loading/>
    }
    if(user && (userType == 'false' || userType == 'true' && user?.user_type_id == 1)) {
        return ( 
            <Route {...rest} render={
                (props) => (<Component {...props}/>)
            }
            />
        )
    }
    //redirect if there is no user 
    return <Redirect to='/login' />
}

export default PrivateRoute;