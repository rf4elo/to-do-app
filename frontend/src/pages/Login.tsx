import { useState } from "react"
import '../styles/LoginRegister.css';

import api from "../services/axios";


// const API_SECRET = import.meta.env.VITE_API_KEY;


export default function Login() {
    
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");


    async function Login() {

        const response = await api.post('/api/login', {
            "email":email,
            "password":password            
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.status == 201) {
            return window.location.href = "/";
        }
        
    }


    return(
        <div className="login-register-content" >
            
            <div className="form" >
                
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Write your email..."
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Write your password..."
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />

                <input type="submit" onMouseUp={Login} value="Login" />

                <p>Don't have an account ? <a href="/register" >Register</a>!</p>

            </div>

        </div>
    )
}
