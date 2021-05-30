import React, {useState} from 'react';
import Auth from "../Hooks/Auth"

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {loginUser, error} = Auth();

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }

        loginUser(data);
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>

                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>

                <button className="w-100 btn btn-lg btn-primary mt-2" type="submit">Sign in</button>
            </form>
        </main>
    )
}

export default Login;