import React, { useContext, useState } from 'react'
import{Link} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
const Login = () => {
    const {toast} = useContext(ToastContext)
    const {loginUser} = useContext(AuthContext)
    const [credentials, setcredentials] = useState({
        email:"",
        password:"",
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!credentials.email || !credentials.password){
            toast.error("Please enter all required field");
            return
        }
        loginUser(credentials);

    }
    return (
        <>
            <h3>Login</h3>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label 
                htmlFor="emailInput" 
                className="form-label mt-4">
                    Email address
                </label>
                <input 
                type="email" 
                className="form-control" 
                id="emailInput" 
                aria-describedby="emailHelp" 
                name="email" 
                value={credentials.email} 
                onChange = {handleInputChange} 
                placeholder="johndoe@example.com"
                required />
            </div>
            <div className="form-group">
                <label 
                htmlFor="passwordInput" 
                className="form-label mt-4">
                    Password
                </label>
                <input 
                type="password" 
                className="form-control" 
                id="passwordInput" 
                name="password" 
                value = {credentials.password} 
                onChange = {handleInputChange} 
                placeholder="Enter password"
                required />
            </div>
            <input type='submit' value="Login" className='btn btn-primary my-3' />
            <p>
                Don't have an account ? <Link to = "/register">Create One</Link>
            </p>
            
            </form>
        </>
    )
}

export default Login