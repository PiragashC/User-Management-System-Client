import { createContext, useContext, useState} from "react";
import ToastContext from "./ToastContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const {toast} = useContext(ToastContext);
    const navigate = useNavigate();
    const [userIn, setUserIn] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    
    //login request
    const loginUser = async(userData) => {
        if(userIn){
            toast.error("Please logout from current user");
        }else{
            try{
                const res = await fetch(`http://localhost:5001/api/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({...userData})
                })
                const result = await res.json();
                if(!result.message){
                    localStorage.setItem("user", JSON.stringify(result._user));
                    if(result._user.role === "admin"){
                        localStorage.setItem("accessToken", result.accessToken);
                    }
                    setUserIn(result._user);
                    toast.success(`Logged in ${result._user.userName} as ${result._user.role}`);
                    if(result._user.role === "admin"){
                        navigate("/users", {replace : true});
                    }else{
                        navigate("/", {replace : true});
                    }
                }else{
                    toast.error(result.message);  
                }
            }catch (err){
                console.log(err);
            }
        }
    }
    
    //register user
    const registerUser = async(userData) => {
        try{
            const res = await fetch(`http://localhost:5001/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...userData})
            })
            const result = await res.json();
            if(!result.message){
                toast.success(`${result.role} as user registered sucessfully! login into your account!`);
                navigate("/login", {replace: true});
            }else{
                toast.error(result.message);
            }
        }catch (err){
            console.log(err);
        }
    }

    return<AuthContext.Provider value={{registerUser, loginUser, userIn, setUserIn}}>
            {children}
        </AuthContext.Provider>
}

export default AuthContext;