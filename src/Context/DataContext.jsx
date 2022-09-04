import { createContext, useEffect, useState } from "react";
import {
    useLocation,
    // useNavigate
} from "react-router-dom";
import instance from "../Api/Axios";
// import useToken from "../Hook/UseToken";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [fuelsdata, setFuelsData] = useState([]);
    // const { token } = useToken();
    // let navigate = useNavigate();
    let location = useLocation();

    const getFuelsData = () => {
        instance
            .get("api/oil/station/fuel/getAll")
            .then((data) => {
                setFuelsData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getFuelsData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/income-fuels": {
            let incomeFuelsData;
            let editIncomeFuelsData;
            formData = {
                formData: incomeFuelsData,
                editFormData: editIncomeFuelsData,
                branchData: false,
                timeFilterInfo: true,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Yoqilg'ini o'zgartirish",
                modalTitle: "Yoqilg'i qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        getFuelsData,
        user,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
