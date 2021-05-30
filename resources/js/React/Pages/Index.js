import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Filter from "../Components/Filter";
import List from "../Components/List";
import AgenciesList from "../Hooks/AgenciesList";
import Agencies from "../Hooks/Agencies";
import Contacts from "../Hooks/Contacts";
import {UserContext} from "../Contexts/UserContext";

const Index = () => {
    const {user} = useContext(UserContext);
    const { agencies, setAgencies } = AgenciesList();
    const [ filters, setFilters ] = useState();
    const { deleteAgency } = Agencies();
    const { deleteContact } = Contacts();

    const handleRemoveAgency = (id) => {
        const filteredAgencies = agencies.filter(item => item.id !== id);
        setAgencies(filteredAgencies);
        deleteAgency(id);
    }

    const handleRemoveContact = (id) => {
        const filteredAgencies = agencies.map(agency => {
            const filteredContacts = agency.contacts.filter(item => item.id !== id);
            agency.contacts = filteredContacts;

            return agency;
        })
        setAgencies(filteredAgencies);
                
        deleteContact(id);
    }

    const createAgencyLink = () => {
        if(user.user_type_id == 1){
            return ( 
                <div className="float-end">
                    <Link className="btn btn-success text-white" to='/agencies/create'>Create agency</Link>
                </div>
            );
        }else{
            return ""
        }
    }

    const updateFilters = (filters) => {
        setFilters(filters);
    }

    return (
        <div className="container">
            {createAgencyLink()}
            <Filter updateFilters={updateFilters}/>
            <List handleRemoveAgency={handleRemoveAgency.bind(this)} handleRemoveContact={handleRemoveContact.bind(this)} agencies={agencies} filters={filters}/>
        </div>
    )
}

export default Index
