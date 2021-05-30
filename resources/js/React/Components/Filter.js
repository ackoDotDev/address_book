import React, {useState} from 'react'

const Filter = ({updateFilters}) => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phone_numbers, setPhoneNumbers ] = useState("");

    const submit = (e) => {
        e.preventDefault();

        const filters = {
            name,
            email,
            phone_numbers
        }
        updateFilters(filters)
    };

    return (
        <div>
            <form onSubmit={submit}>
                <input placeholder="Name" className="border border-primary rounded me-2" onChange={e => setName(e.target.value)}/>
                <input placeholder="Email" className="border border-primary rounded me-2" onChange={e => setEmail(e.target.value)}/>
                <input placeholder="Phone Number" className="border border-primary rounded me-2" onChange={e => setPhoneNumbers(e.target.value)}/>
                <button className="btn btn-primary text-white btn-sm">Search</button>
            </form>
        </div>
    )
}

export default Filter
