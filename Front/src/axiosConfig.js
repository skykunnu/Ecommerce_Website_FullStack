import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD

baseURL:"http://localhost:4000/api"
=======
baseURL:"https://ecommerce-website-fullstack.onrender.com/api"
>>>>>>> 47c3bd0cb336ebca304e6984931f18101f899513
});

export default instance;

// For more Knowledge

// Other arguments to create
// withCredentials
// timeout
// interceptor
