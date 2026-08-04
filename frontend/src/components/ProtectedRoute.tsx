import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/axios";



export function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        api.get('/api/auth')
        .then(() => {
            setIsAuthenticated(true);
        })
        .catch((error) => {
            console.error("Error: ", error);
            setIsAuthenticated(false);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);


    if(loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }} >
                <h1>Loading...</h1>
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />

}
