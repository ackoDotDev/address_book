import React, { useState } from 'react'
import Auth from '../Hooks/Auth'


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [user_type_id, setUserType] = useState(1);

    const { registerUser, error } = Auth();


    const submit = async (e) => {
        e.preventDefault();
        const values = {
            name, 
            email, 
            password, 
            password_confirmation, 
            user_type_id
        };

        await registerUser(values);
    }

    return (
        <main className="form-register" onSubmit={submit}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <input type="name" className="form-control" placeholder="Name" onChange={e => setName(e.target.value)}/>

                <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>

                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" className="form-control" placeholder="Password" onChange={e => setPasswordConfirmation(e.target.value)}/>
                <select className="form-control" name='user_type' onChange={e => setUserType(e.target.value)}>
                    <option value="1">Admin</option>
                    <option value="2">Contact</option>
                </select>

                <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Sign up</button>
            </form>
        </main>
    )
}

export default Register
