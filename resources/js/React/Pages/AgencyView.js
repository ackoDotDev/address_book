import React from 'react'
import ContactListItam from '../Components/ContactListItam'
import GetAgency from "../Hooks/GetAgency";

const AgencyView = () => {
    const { agency } = GetAgency();



    return (
        <div className="container">
            <div className="my-3 p-3 bg-body rounded shadow-sm" id={agency?.id}>
                <div className="border-bottom pb-2 mb-0">
                    <strong className="d-block ">{agency?.name}</strong>
                    <p className="mb-0">Address: {agency?.address}, {agency?.city?.name}</p>
                    <p className="mb-0">Phone numbers: {agency?.phone_numbers} </p>
                    <p className="mb-0">Email: {agency?.email} </p>
                    <p className="mb-0">Web: {agency?.web} </p>
                </div>
                
                {agency?.contacts?.map(contact => {
                    return (
                        <ContactListItam key={contact?.id} contact={contact} />
                    )
                })}
            </div>
        </div>
    )
}

export default AgencyView
