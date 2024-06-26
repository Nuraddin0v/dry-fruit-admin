import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";

const OutcomeDryFruit = () => {
    const [incomeFuel, setIncomeFuel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { fuelsData, employe } = useData();

    const getIncomeFuels = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/dry/fruit/outcomeDryFruit/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data.data.dryFruit.map((item) => {
                    return {
                        ...item,
                        incomeTime: moment(item.incomeTime).toISOString(),
                    };
                });
                setIncomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                message.error("Sotilgan mevani yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Meva turi",
            dataIndex: "dryFruitId",
            key: "dryFruitId",
            width: "20%",
            search: false,
            render: (record) => {
                const fuel = fuelsData.filter((item) => item.id === record);
                return fuel[0]?.type;
            },
        },
        {
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "20%",
            sorter: (a, b) => {
                if (a.amount < b.amount) {
                    return -1;
                }
                if (a.amount > b.amount) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
        {
            title: "Sotilgan vaqti",
            dataIndex: "date",
            key: "date",
            width: "20%",
            search: false,
            render: (record) => {
                return record.substr(0, 10);
            },
        },
        {
            title: "Sotilish narxi",
            dataIndex: "price",
            key: "price",
            width: "20%",
            search: false,
        },
        {
            title: "Qarzdorlik",
            dataIndex: "debt",
            key: "debt",
            width: "20%",
            search: false,
            render: (record) => {
                return record ? "Bor" : "Yo'q";
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        const value = {
            ...values,
            incomeTime: values.incomeTime.toISOString(),
            debt: values.debt.target.value,
        };
        instance
            .post("api/dry/fruit/outcomeFruit/", { ...value })
            .then(function (response) {
                message.success("Sotilgan meva muvaffaqiyatli qo'shildi");
                getIncomeFuels(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error("Sotilgan mevani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const onEdit = (values, initial) => {
        setLoading(true);
        const time = values.incomeTime.toISOString().substr(0, 10);
        const data = {
            ...values,
            debt: values.debt.target.value,
            incomeTime: time,
            id: initial.id,
        };
        instance
            .put(`api/dry/fruit/outcomeFruit/${initial.id}`, { ...data })
            .then((res) => {
                message.success("Sotilgan meva muvaffaqiyatli taxrirlandi");
                getIncomeFuels(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                message.error("Sotilgan mevani taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/dry/fruit/outcomeFruit/${item}`)
                .then((data) => {
                    getIncomeFuels(current - 1, pageSize);
                    message.success("Sotilgan meva muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    message.error(
                        "Sotilgan mevani o'chirishda muammo bo'ldi"
                    );
                });
            return null;
        });
        setLoading(false);
    };

    return (
        <>
            <CustomTable
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getIncomeFuels}
                columns={columns}
                tableData={incomeFuel}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
            />
        </>
    );
};

export default OutcomeDryFruit;