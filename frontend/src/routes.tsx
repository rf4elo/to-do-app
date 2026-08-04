import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { App } from "./pages/App";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { Error404 } from "./pages/404";
import { todoListLoader } from "./components/ListTasks";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <App />,
                loader: todoListLoader
            }
        ]
    },
    {
        path: "/:path",
        element: <Error404 />
    }
]);

