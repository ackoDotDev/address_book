import React, {useContext} from 'react';
import {UserContext} from "../Contexts/UserContext";
import {Link} from "react-router-dom";

const Profil = () => {
    const {user} = useContext(UserContext);

    return (
        <div className="container">
            <div className="card mb-4 rounded-3 shadow-sm border-primary">
          <div className="card-header py-3 text-white bg-primary border-primary">
            <h4 className="my-0 fw-normal">User Profile</h4>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mt-3 mb-4">
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
              <li>User type: {user.user_type.name}</li>
            </ul>
            <Link to="/profile/edit" className="w-100 btn btn-lg btn-primary">Edit user</Link>
          </div>
        </div>
        </div>
    )
}

export default Profil
