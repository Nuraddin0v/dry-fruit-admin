import axios from "axios";
// import { jsx, css } from "@emotion/react";

// const token = JSON.parse(sessionStorage.getItem("token"));

const instance = axios.create({
    baseURL: "https://app-dry-fruits.herokuapp.com/",
    // headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    // },
});

export default instance;

// import { getAccessToken, getLang } from '../helpers';
// import axios from "axios";
// import { BASE_URL } from "../constants";

// export const request = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Accept: 'application/json',
//     "Accept-Language": getLang()
//   }
//   // timeout: 10000,
// });

// request.interceptors.request.use((config) => {
//   if (config.headers === undefined) config.headers = {};
//   config.headers.Authorization = 'Bearer ' + getAccessToken();
//   return config;
// })

export const EmotionButton = ({ children }) => (
    <button
        css={{
            backgroundColor: "#FAFBFC",
            /** ... more styling **/
            "&:hover": {
                borderColor: "#405cf5",
                color: "#405cf5",
            },
        }}
    >
        {children}
    </button>
);
