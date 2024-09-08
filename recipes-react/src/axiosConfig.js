// Imports
import axios from "axios";

// The base URL for the API
export const HOST = "http://212.227.245.238";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL: HOST
});

// Add a response interceptor to log errors and rethrow them
axiosInstance.interceptors.response.use(
    response => response, // If the response is successful, return the response
    error => {
        console.log("Request failed:", error);
        // Throw the error to be handled by the calling code
        throw error;
    }
);

export default axiosInstance;