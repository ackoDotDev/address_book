import React from 'react'
import GetContact from "../Hooks/GetContact"
const ContactView = () => {

    const {contact} = GetContact();

    return (
        <div id={contact.id} className="container">

            <div className="px-4 py-5 my-5 text-center">
                <img className="d-block mx-auto mb-4" width="72" height="72"  src={"/uploads/image/"+contact.avatar}/>

                <h1 className="display-5 fw-bold">{contact.first_name} {contact.last_name}</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="mb-0">Phone numbers: {contact.phone_numbers} </p>
                    <p className="mb-0">Email: {contact.email} </p>
                    <p className="mb-0">Web: {contact.web} </p>  
                    <p className="mb-0">Professsion: {contact?.professions?.map(profession => {
                        return (
                            <span key={profession.id}>{profession.name + ", "} </span>
                        )
                        })}
                    </p>  
                </div>


            </div>

        </div>
    )
}

export default ContactView
