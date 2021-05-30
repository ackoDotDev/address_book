import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AgenciesList() {
   const [agencies, setAgencies] = useState([]);
   const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function agenciesList() {
            await axios.get('/api/agencies/list')
            .then(res => {
                if(res?.data){
                    setAgencies(res.data);
                }
                setLoading(false);
        }). catch(err => {  
                setLoading(false);
        });
    }
    agenciesList();
    }, []);

    return {
        agencies,
        setAgencies,
        isLoading
    }
}