import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function GetAgency() {
   const [contact, setContact] = useState([]);
   const [isLoading, setLoading] = useState(true);

   const {id} = useParams();
    useEffect(() => {
        async function getAgency() {
            await axios.get('/api/contacts/'+ id)
            .then(res => {
                if(res?.data){
                    setContact(res.data[0]);
                }

                setLoading(false);
        }). catch(err => {  
                setLoading(false);
        });
    }
    getAgency();
    }, []);

    return {
        contact,
        isLoading
    }
}