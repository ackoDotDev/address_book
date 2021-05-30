import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CountriesAndCities() {
   const [countries, setCountries] = useState([]);
   const [cities, setCities] = useState([]);
   const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function getCities() {
            await axios.get('/api/cities')
            .then(res => {
                if(res?.data?.countries){
                    setCountries(res.data.countries);
                }
                if(res?.data?.cities){
                    setCities(res.data.cities);
                }
                setLoading(false);
        }). catch(err => {  
                setLoading(false);
        });
    }
        getCities();
    }, []);

    return {
        countries,
        cities,
        isLoading
    }
}