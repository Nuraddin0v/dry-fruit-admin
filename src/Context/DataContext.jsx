import { Input, InputNumber, Radio } from "antd";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";
import CustomSelect from "../Module/Select/Select";
// import useToken from "../Hook/UseToken";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [measurementData, setMeasurementData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    // const [roleData, setRoleData] = useState([]);
    const [branchData, setBranchData] = useState([]);
    // const { token } = useToken();
    // let navigate = useNavigate();
    let location = useLocation();

    const othersData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
    ];

    const othersBranchData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "main",
            label: "Bu filial asosiymi",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Ha </Radio>
                </Radio.Group>
            ),
        },
    ];

    const editOthersBranchData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "main",
            label: "Bu filial asosiymi",
            inputSelect: (defaultId = null) => {
                const str = defaultId?.toString();
                return (
                    <Radio.Group defaultValue={str}>
                        <Radio value="false"> Yo'q </Radio>
                        <Radio value="true"> Ha </Radio>
                    </Radio.Group>
                );
            },
        },
    ];

    const dryFruitData = [
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                />
            ),
        },
        {
            name: "incomePrice",
            label: "Kelish narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "outcomePrice",
            label: "Sotilish narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editdryFruitData = [
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            inputSelect: (defaultId = null) => {
                return (
                    <CustomSelect
                        DValue={defaultId}
                        backValue={"id"}
                        placeholder={"Kategoriyani tanlang"}
                        selectData={categoryData}
                    />
                );
            },
        },
        {
            name: "incomePrice",
            label: "Kelish narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "outcomePrice",
            label: "Sotilish narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const clientsData = [
        {
            name: "fio",
            label: "Klient FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Klient nomeri",
            input: <Input />,
        },
        {
            name: "address",
            label: "Klient addressi",
            input: <Input />,
        },
    ];

    const getMeasurementData = () => {
        instance
            .get("api/dry/fruit/measurement/all")
            .then((data) => {
                setMeasurementData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getCategoryData = () => {
        instance
            .get("api/dry/fruit/category")
            .then((data) => {
                setCategoryData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getBranchData = () => {
        instance
            .get("api/dry/fruit/api/dry/fruit/branch")
            .then((data) => {
                setBranchData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    // const getRoleData = () => {
    //     instance
    //         .get("api/dry/fruit/category")
    //         .then((data) => {
    //             setCategoryData(data.data.data);
    //         })
    //         .catch((err) => console.error(err));
    // };

    useEffect(() => {
        getMeasurementData();
        getCategoryData();
        getBranchData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/others": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/branchs": {
            formData = {
                formData: othersBranchData,
                editFormData: editOthersBranchData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Filialni o'zgartirish",
                modalTitle: "Yangi filial qo'shish",
            };
            break;
        }
        case "/dryfruit": {
            formData = {
                formData: dryFruitData,
                editFormData: editdryFruitData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Filialni o'zgartirish",
                modalTitle: "Yangi filial qo'shish",
            };
            break;
        }
        case "/clients": {
            formData = {
                formData: clientsData,
                editFormData: clientsData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Filialni o'zgartirish",
                modalTitle: "Yangi filial qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        getMeasurementData,
        measurementData,
        getCategoryData,
        categoryData,
        getBranchData,
        branchData,
        user,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
