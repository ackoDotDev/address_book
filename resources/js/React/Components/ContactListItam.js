import React, {useContext}  from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "../Contexts/UserContext";

const ContactListItam = ({handleRemoveContact, contact}) => {
    const { user, isLoading } = useContext(UserContext);
    
    const adminLinks = () => {
        if(user.user_type_id == 1 && handleRemoveContact !== undefined){
            return (
                <div className="float-end">
                    <small className="d-block text-end">
                        <Link className="btn btn-primary text-white mt-1 btn-sm p-0" to={ "/contacts/view/" + contact.id}>Details</Link><br/>
                        <Link className="btn btn-warning  mt-1 btn-sm py-0 px-2" to={ "/contacts/edit/" + contact.id}>Edit</Link><br/>
                        <a className="btn btn-danger text-white mt-1 btn-sm p-0" onClick={handleRemoveContact}>Delete</a><br/>
                    </small>
                </div>
            );
        }else{
            return <div className="float-end"></div>
        }
    }
    
    return (
        <div id={contact.id}>
            <div className="text-muted py-3">
                
                {adminLinks()}

                <img className="bd-placeholder-img flex-shrink-0 me-2 rounded float-start" width="48" height="48"  src={"/uploads/image/"+contact.avatar}/>

                <div className="pb-4 mb-0 small lh-sm border-bottom ps-5">
                    <strong className="d-block text-gray-dark">{contact.first_name} {contact.last_name}</strong>
                    <p className="mb-0">Phone numbers: {contact.phone_numbers} </p>
                    <p className="mb-0">Email: {contact.email} </p>
                    <p className="mb-0">Web: {contact.web} </p>             
                </div>
            </div>
        </div>
    )
}

export default ContactListItam
