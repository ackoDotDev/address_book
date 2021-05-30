import React, {useState, useEffect} from 'react';
import Agencies from "../Hooks/Agencies";
import CountriesAndCities from "../Hooks/CountriesAndCities";

const AgencyCreate = () => {
    const { createAgency } = Agencies();

    const [name, setName] = useState();
    const [web, setWeb] = useState();
    const [phone_numbers, setPhoneNumbers] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [city_id, setCity] = useState(1);

    const { countries, cities } = CountriesAndCities();
    
    const [selectedCountry, setSelectedCountry] = useState();
    const [ renderCities, setRenderCities ] = useState([]);

    const changeCountry = (value) => {
        setSelectedCountry(value);
    }

    useEffect(() => { 
        
        const rcities = cities.filter(city => {
            if(selectedCountry == city.country_id){
                return city;
            }
        }) 
        setRenderCities(rcities) 
    }, [selectedCountry])
    
    const submit = (e) => {
        e.preventDefault()
        const values={
            name, 
            web,
            phone_numbers,
            email, 
            address,
            city_id, 
        };
        createAgency(values);
    }

    return (
        <div className="container">
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Create Agency</h1>

          <div className="row g-3">
        
            <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" onChange={e => setName(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address" onChange={e => setAddress(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="phonenumbers" className="form-label">Phone numbers(enter comma separeted values)</label>
                <input type="text" className="form-control" id="phonenumbers" onChange={e => setPhoneNumbers(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="web" className="form-label">Web</label>
                <input type="text" className="form-control" id="web" onChange={e => setWeb(e.target.value)}/>
            </div>

            <div className="col-md-6">
              <label htmlFor="country" className="form-label">Country</label>
              <select className="form-select" id="country" onChange={e => changeCountry(e.target.value)}>
                <option value="">Choose...</option>
                    {countries.map(country => {
                        return (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        )
                    })}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label">City</label>
              <select className="form-select" id="city" onChange={e => setCity(e.target.value)}>
                <option value="">Choose...</option>
                    {renderCities.map(city => {
                        return (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        )
                    })}
              </select>
            </div>
          </div>

          <button className="w-25 btn btn-primary btn-lg mt-2" type="submit">Create</button>
        </form>
        </div>
    )
}

export default AgencyCreate
