import axios from "axios";

// const token = JSON.parse(sessionStorage.getItem("token"));

const instance = axios.create({
    baseURL: "https://app-dry-fruits.herokuapp.com/",
    // headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    // },
});

export default instance;
