import React, { useContext, useEffect, useState } from 'react'
import{Link, useNavigate} from "react-router-dom";

import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Register = () => {
    const navigate = useNavigate();
    const {toast} = useContext(ToastContext);
    const {userIn, registerUser} = useContext(AuthContext);
    const [credentials, setcredentials] = useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"",
    })
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setcredentials({...credentials, [name]:value});
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!credentials.userName || !credentials.email || !credentials.password || !credentials.confirmPassword || !credentials.role){
            toast.error("Please enter all required field");
            return
        }
        if ( credentials.password !== credentials.confirmPassword){
            toast.error("Password do not match");
            return
        }
        registerUser({...credentials, confirmPassword: undefined});
    }
    useEffect(() => {
        if(userIn){
            if(userIn.role === "admin"){
                navigate("/users", {replace : true});
            }else{
                navigate("/", {replace : true});
            }
        }
    },[])
    return (
        <>
            <h3>Create your account</h3>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label 
                htmlFor="userNameInput" 
                className="form-label mt-4">
                    UserName
                </label>
                <input 
                type="text" 
                className="form-control" 
                id="userNameInput"  
                name="userName" 
                value={credentials.userName}
                onChange={handleInputChange}
                placeholder="john Doe"
                required/>
            </div>
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
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required/>
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
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required />
            </div>
            <div className="form-group">
                <label 
                htmlFor="confirmpassword" 
                className="form-label mt-4">
                    Confirm Password
                </label>
                <input 
                type="password" 
                className="form-control" 
                id="confirmPasswordInput" 
                name="confirmPassword" 
                value = {credentials.confirmPassword}
                onChange={handleInputChange}
                placeholder="Enter password"
                required />
            </div>
            <div className="form-group">
                <label 
                htmlFor="role" 
                className="form-label mt-4">
                    Role of User
                </label>
                <input 
                type="text" 
                className="form-control" 
                id="role" 
                name="role" 
                value = {credentials.role}
                onChange={handleInputChange}
                placeholder="Enter the user role (Eg:admin/teacher/student)"
                required />
            </div>
            <input type='submit' value="Register" className='btn btn-primary my-3' />
            <p>
                Already have an account ? <Link to = "/login">Login</Link>
            </p>
            </form>
        </>
    )
}

export default Register;