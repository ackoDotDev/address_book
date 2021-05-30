import { useState, useContext } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";

export default function Agencies() {

    const [error, setError] = useState(null);

    //Create agency
    const createAgency = (data) => {
        const { name, web, phone_numbers, email, address, city_id } = data;

        return axios.post(`/api/agencies`, {
            name, 
            web,
            phone_numbers,
            email, 
            address,
            city_id, 
        }).then(() => {
            window.location="/";
            // <Redirect to="/"/>
        }).catch((err) => {
            setError(err.data);
        })
    };

    //Update agency
    const updateAgency = async(data) => {
        const { name, web, phone_numbers, email, address, city_id, id } = data;

        axios.post('/api/agencies/'+ id,{
            name, 
            web,
            phone_numbers,
            email, 
            address,
            city_id,
            _method: "PUT"
        }).then(() => {
            window.location="/";

        }).catch((err) => {
            setError(err.data);
        });
    }

    //Delete agency
    const deleteAgency = async(id) => {
        axios.post(`api/agencies/` + id,{
            _method: "DELETE"
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
           setError(err.data);
        });
    }
  

   return {
      createAgency,
      updateAgency,
      deleteAgency,
      error
   }
}