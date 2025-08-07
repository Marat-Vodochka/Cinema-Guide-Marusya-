import axios from "axios";

const api = axios.create({
    baseURL: "https://cinemaguide.skillbox.cc",
    withCredentials: true,
    headers:{
        "Content-Type": "application/json"
    },
});

export default api