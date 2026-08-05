import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
    }
});


api.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response && error.response.status == 401) {
            console.log(error);
        };
        return Promise.reject(error);
    }
);



export default api;
