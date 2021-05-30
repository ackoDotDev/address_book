import React, {useState, useEffect} from 'react';
import Contacts from "../Hooks/Contacts";
import Professions from "../Hooks/Professions";
import GetContact from "../Hooks/GetContact";
import {useParams} from "react-router-dom";
import Select from "react-select";

const ContactEdit = () => {
    const { updateContact } = Contacts();
    const { contact } = GetContact();

    const {professions} = Professions();
    
    const {id} = useParams();

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [web, setWeb] = useState();
    const [phone_numbers, setPhoneNumbers] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState();
    const [agency_id, setAgencyId] = useState();

    const [selectedProfessions, setSelectedProfessions] = useState([]);
    const handleSelected = (e) => {
        setSelectedProfessions(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedProfessions)

    }

    useEffect(() => {
        setFirstName(contact.first_name);
        setLastName(contact.last_name);
        setWeb(contact.web);
        setPhoneNumbers(contact.phone_numbers);
        setEmail(contact.email);
        setAvatar(contact.avatar);
        setAgencyId(contact.agency_id);

        const profession_ids = contact?.professions?.map(item => item.id);
        setSelectedProfessions(profession_ids);

    }, [contact])

    const submit = (e) => {
        e.preventDefault()

        const values={
            first_name, 
            last_name, 
            web,
            phone_numbers,
            email, 
            avatar,
            agency_id,
            professions: selectedProfessions,
            id : id, 
        };
        
        updateContact(values);
    }

    return (
        <div className="container">
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Update Contact</h1>

          <div className="row g-3">
        
            <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" defaultValue={first_name} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" defaultValue={last_name} onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="address" className="form-label">Avatar</label>
                <input type="file" name="image" accept="image/*" multiple={false} onChange={e => setAvatar(e.target.files[0])} />
            </div>
            <div className="col-12">
                <label htmlFor="phonenumbers" className="form-label">Phone numbers(enter comma separeted values)</label>
                <input type="text" className="form-control" id="phonenumbers" defaultValue={phone_numbers} onChange={e => setPhoneNumbers(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" defaultValue={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="web" className="form-label">Web</label>
                <input type="text" className="form-control" id="web" defaultValue={web} onChange={e => setWeb(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="web" className="form-label">Professions</label>
                <Select
                    className="dropdown"
                    placeholder="Select Option"
                    value={professions.filter(obj => selectedProfessions?.includes(obj.value))} 
                    options={professions} 
                    onChange={handleSelected} 
                    isMulti
                    isClearable
                />
            </div>

          </div>

          <button className="w-25 btn btn-primary btn-lg mt-2" type="submit">Update</button>
        </form>
        </div>
    )
}

export default ContactEdit
