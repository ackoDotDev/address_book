import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import ContactListItam from '../Components/ContactListItam';
import {UserContext} from "../Contexts/UserContext";

const AgencyListItem = ({ handleRemoveAgency, handleRemoveContact, agency}) => {
    const { user, isLoading } = useContext(UserContext);

    const adminLinks = () => {
        if(user.user_type_id == 1){
            return (
                <div className="float-end">
                    <small className="d-block text-end mt-3">
                        <Link className="btn btn-primary text-white mt-1 btn-sm p-0" to={ "/agencies/view/" + agency.id}>Details</Link><br/>
                        <Link className="btn btn-warning  mt-1 btn-sm py-0 px-2" to={ "/agencies/edit/" + agency.id}>Edit</Link><br/>
                        <a className="btn btn-danger text-white mt-1 btn-sm p-0" onClick={handleRemoveAgency}>Delete</a><br/>
                    </small>
                </div>
            );
        }else{
            return ""
        }
    }

    const createContactLink = () => {
        if(user.user_type_id == 1){
            return (
                <Link  className="btn btn-success text-white mt-2" to={ "/contacts/create/" + agency.id}>Create contact</Link>
            );
        }else{
            return ""
        }
    }

    return (
        <div className="my-3 p-3 bg-body rounded shadow-sm" id={agency.id}>
            <div className="row mb-3">
                <div className="col-md-4 themed-grid-col">

                    {adminLinks()}
                    
                    <strong className="d-block ">{agency.name}</strong>
                    <p className="mb-0">Address: {agency.address}, {agency.city.name}</p>
                    <p className="mb-0">Phone numbers: {agency.phone_numbers} </p>
                    <p className="mb-0">Email: {agency.email} </p>
                    <p className="mb-0">Web: {agency.web} </p>
                </div>
                <div className="col-md-8 themed-grid-col">
                    {agency.contacts.map(contact => {
                        return (
                            <ContactListItam key={contact.id} handleRemoveContact={() => handleRemoveContact(contact.id)} contact={contact} />
                        )
                    })}
                    {createContactLink()}
                </div>
            </div>
        </div>
    )
}

export default AgencyListItem
