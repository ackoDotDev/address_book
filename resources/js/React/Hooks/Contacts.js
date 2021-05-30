import { useState } from 'react';
import axios from 'axios';

export default function Contacts() {

    const [error, setError] = useState(null);

    //Create contact
    const createContact = (values) => {
        const { first_name, last_name, web, phone_numbers, email, avatar, professions, agency_id } = values;

        let data = new FormData();
        data.set("avatar", avatar);
        data.set("first_name", first_name);
        data.set("last_name", last_name);
        data.set("web", web);
        data.set("phone_numbers", phone_numbers);
        data.set("email", email);
        data.set("professions", professions);
        data.set("agency_id", agency_id);

        return axios.post(`/api/contacts?XDEBUG_SESSION_START=VSCODE`, data).then((res) => {
            console.log(res);
            window.location="/";
        }).catch((err) => {
            setError(err.data);
        })
    };

    //Update contact
    const updateContact = async(values) => {
        const { first_name, last_name, web, phone_numbers, email, avatar, professions, agency_id, id } = values;
        console.log('test')
        let data = new FormData();
        data.set("avatar", avatar);
        data.set("first_name", first_name);
        data.set("last_name", last_name);
        data.set("web", web);
        data.set("phone_numbers", phone_numbers);
        data.set("email", email);
        data.set("professions", professions);
        data.set("agency_id", agency_id);
        data.set("_method", "PUT");

        axios.post('/api/contacts/'+ id + '?XDEBUG_SESSION_START=VSCODE', data).then(() => {
            window.location="/";
        }).catch((err) => {
            setError(err.data);
        });
    }

    //Delete contact
    const deleteContact = async(id) => {
        axios.post(`api/contacts/` + id,{
            _method: "DELETE"
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
           setError(err.data);
        });
    }
  

   return {
      createContact,
      updateContact,
      deleteContact,
      error
   }
}