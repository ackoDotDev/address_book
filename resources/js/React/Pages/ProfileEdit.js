import React, { useState, useContext, useEffect } from 'react'
import Auth from '../Hooks/Auth'
import {UserContext} from "../Contexts/UserContext"

const ProfileEdit = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user_type_id, setUserType] = useState(1);

    const { updateUser } = Auth();
    const {user} = useContext(UserContext);

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setUserType(user.user_type_id);
    }, [user])



    const submit = async (e) => {
        e.preventDefault();
        const values = {
            name, 
            email, 
            user_type_id
        };

        await updateUser(values);
    }

    return (
        <main className="form-register" onSubmit={submit}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Update profile</h1>
                <input type="name" className="form-control" placeholder="Name" defaultValue={name} onChange={e => setName(e.target.value)}/>

                <input type="email" className="form-control" placeholder="name@example.com" defaultValue={email} onChange={e => setEmail(e.target.value)}/>

                <select className="form-control" name='user_type' defaultValue={user_type_id} onChange={e => setUserType(e.target.value)}>
                    <option value="1">Admin</option>
                    <option value="2">Contact</option>
                </select>

                <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Update</button>
            </form>
        </main>
    )
}

export default ProfileEdit
