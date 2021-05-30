import React from 'react';
import AgencyListItem from "../Components/AgencyListItem";


const List = ({handleRemoveAgency, handleRemoveContact, agencies, filters}) => {
    
    return (
        <div>
            {agencies.filter(agency => {
                if(agency.name.includes(filters?.name ?? "") && agency.email.includes(filters?.email ?? "") && agency.phone_numbers.includes(filters?.phone_numbers ?? "")){
                    return agency;
                }else{
                    let contact = agency.contacts.map(contact => {
                        if((contact.first_name.includes(filters?.name ?? "") || contact.last_name.includes(filters?.name ?? "")) && contact.email.includes(filters?.email ?? "") && contact.phone_numbers.includes(filters?.phone_numbers ?? "")){
                            return contact;
                        }
                    })
                    contact = contact.filter(item => item);
                    if(contact.length > 0){
                        return agency
                    }
                }
            }).map(agency => {

               return (
                   <AgencyListItem key={agency.id} handleRemoveAgency={() => handleRemoveAgency(agency.id)} handleRemoveContact={handleRemoveContact} agency={agency} />
               )
           })}
        </div>
    )
}

export default List
