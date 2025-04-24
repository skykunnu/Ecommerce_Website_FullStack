import axios from "axios";

const instance = axios.create({
baseURL:"https://ecommerce-website-fullstack.onrender.com/api"
});

export default instance;

// For more Knowledge

// Other arguments to create
// withCredentials
// timeout
// interceptor
