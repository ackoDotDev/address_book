import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Professions() {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfessions() {
            await axios.get('/api/professions/')
            .then(res => {
                if(res?.data?.professions){
                    setProfessions(res.data.professions);
                }
                setLoading(false);
        }). catch(err => {  
            setLoading(false);
        });
    }
    getProfessions();
    }, []);

    return {
        professions,
        isLoading
    }
}