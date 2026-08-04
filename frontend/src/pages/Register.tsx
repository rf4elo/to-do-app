import { useState } from "react"
import '../styles/LoginRegister.css';



const API_SECRET = import.meta.env.VITE_API_KEY;


export default function Register() {

    const[name, setName]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const[confirm, setConfirm]= useState("");

    async function Register() {

        if(password == confirm) {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_SECRET
                },
                body: JSON.stringify({ "email":email, "name":name, "password":password })
            });
    
            if(response.ok) {
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

                <input type="submit" onClick={Register} value="Login" />

                <p>Just have an account ? <a href="/login" >Login</a>!</p>

            </div>

        </div>
    )
}
