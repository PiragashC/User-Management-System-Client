import React, { useState, useEffect, useContext } from 'react'
import Spinner from '../components/Spinner';
import ToastContext from '../context/ToastContext';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const AllUsers = () => {
    const navigate = useNavigate();
    const {userIn} = useContext(AuthContext);
    const {toast} = useContext(ToastContext)
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
  
    const getAllUsers = async() => {
        try{
            const res = await fetch(`http://localhost:5001/api/users/admin`,{
                method:"GET",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const result = await res.json();
            if(!result.message){
                setUsers(result);
                setLoading(false);
            }else{
                toast.error(result.message);
                setLoading(false);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(!userIn){
            navigate("/register", {replace : true});
        }
        setLoading(true);
        getAllUsers();
    },[]);

    return (
            <div>
                <h1>All Users</h1>
                <hr className="my-4" />
                    {loading ? <Spinner splash='Loading Users...' /> : (
                        <>
                            {users.length === 0 ? <h3>No Users Created Yet</h3> : (
                                <>
                                    <p>Total Users: <strong>{users.length}</strong></p>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr className='table-dark'>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => {
                                                return <tr key={user._id}>
                                                        <th scope="row">{user.userName}</th>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>
                                                    </tr>
                                            })}
                                        </tbody>
                                    </table>
                                </>
                                
                            )}
                        </>
                    )}
            </div>
    )
}

export default AllUsers;