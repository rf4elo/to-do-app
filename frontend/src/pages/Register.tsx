import '../styles/LoginRegister.css';
import { useState } from "react"

import api from '../services/axios';

import { Footer } from "../components/Footer";



export default function Register() {

    const[name, setName]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const[confirm, setConfirm]= useState("");

    async function Register() {

        if(!name || !email || !password || !confirm) return alert("All fields must be filled.");

        if(password == confirm) {
            const response = await api.post("/api/register", {
                "name": name,
                "email": email,
                "password": password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.status == 201) {
                window.location.href = "/login";
            }
        } else {
            alert("The passwords must match.");
        }

    }

    return(
        <div className="login-register-content" >
            
            <div className="form" >
                
                <h1>Register</h1>

                <input
                    type="text"
                    placeholder="Write your name..."
                    value={name} onChange={(e) => setName(e.target.value)}
                />

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

                <input
                    type="password"
                    placeholder="Confirm your password..."
                    value={confirm} onChange={(e) => setConfirm(e.target.value)}
                />

                <input type="submit" onClick={Register} value="Register" />

                <p>Just have an account ? <a href="/login" >Login</a>!</p>

            </div>

            <Footer />

        </div>
    )
}
