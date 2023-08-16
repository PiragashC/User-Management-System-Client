import React, { useContext } from 'react'
import{Link, useNavigate} from "react-router-dom";
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const NavBar = ({title = "User Management System"}) => {
    const navigate = useNavigate();
    const {userIn, setUserIn} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);

    return (
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to ="/" className="navbar-brand" >{title}</Link>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav ms-auto">
                            {userIn ?
                                <>
                                    <li className="nav-item">
                                        <button 
                                        className='btn btn-danger'
                                        onClick={() => {
                                            setUserIn(null);
                                            localStorage.clear();
                                            toast.success("Logged out.");
                                            navigate("/login", {replace: true});
                                        }}
                                        >Logout</button>
                                    </li> 
                                </>:
                                <>
                                    <li className="nav-item">
                                        <Link  to ="/login" className="nav-link">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to = "/register" className="nav-link">Register</Link>
                                    </li>
                                </>
                            } 
                        </ul>
                    </div>
                </div>
                <span style={{fontWeight: 100}}>© 2023 Piragash_C</span>
            </nav>
    )
}

export default NavBar;