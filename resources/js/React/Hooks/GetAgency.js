import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function GetAgency() {
   const [agency, setAgency] = useState([]);
   const [isLoading, setLoading] = useState(true);

   const {id} = useParams();
    useEffect(() => {
        async function getAgency() {
            await axios.get('/api/agencies/'+ id)
            .then(res => {
                if(res?.data){
                    setAgency(res.data[0]);
                }

                setLoading(false);
        }). catch(err => {  
                setLoading(false);
        });
    }
    getAgency();
    }, []);

    return {
        agency,
        isLoading
    }
}