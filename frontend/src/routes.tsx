import { createBrowserRouter } from "react-router-dom";

import { App } from "./pages/App";
import { Error404 } from "./pages/404";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },

    {
        path: "/:path",
        element: <Error404 />
    }
]);
