import {React, useState} from "react";
import axios from "axios"
import Loader from "../components/Loader"
import Error from "../components/Error"
import Success from "../components/Success";

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try{
                setLoading(true);
                const result = await axios.post('/api/users/register', user).data;
                setLoading(false);
                setSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setCPassword('');
            } catch(error){
                setLoading(false);
                setError(true);
                console.log(error);
            }
        }
        else {
            alert("Passwords do not match");
        }
    }
    return (
        <div>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 bs">
                    {success && (<Success message = "Registration successful"/>)}
                    <h2>Register</h2>
                    <input type="text" className="form-control" placeholder="name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className="form-control" placeholder="email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" className="form-control" placeholder="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" className="form-control" placeholder="confirm password"
                        value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                    <button className="btn btn-primary mt-3" onClick={register}>Register</button>
                </div>
            </div>
        </div>
    )
}