import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";

const IncomeDryFruit = () => {
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
                `api/dry/fruit/incomeDryFruit/getAllPageable?page=${current}&size=${pageSize}`
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
                message.error("Kelgan yoqilg'ilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Yoqilg'i turi",
            dataIndex: "fuelId",
            key: "fuelId",
            width: "15%",
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
            width: "10%",
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
            title: "Hisoblagich",
            dataIndex: "counter",
            key: "counter",
            width: "10%",
            search: false,
        },
        {
            title: "Narxi",
            dataIndex: "incomePrice",
            key: "incomePrice",
            width: "10%",
            search: false,
        },
        {
            title: "Sotilish narxi",
            dataIndex: "salePrice",
            key: "salePrice",
            width: "10%",
            search: false,
        },
        {
            title: "Kelish vaqti",
            dataIndex: "incomeTime",
            key: "incomeTime",
            width: "15%",
            search: false,
            render: (record) => {
                return record.substr(0, 10);
            },
        },
        {
            title: "Qabul qilgan hodim",
            dataIndex: "employeeId",
            key: "employeeId",
            width: "20%",
            search: false,
            render: (record) => {
                const fuel = employe.filter((item) => item.id === record);
                return fuel[0]?.fio;
            },
        },
        {
            title: "Qarzdorlik",
            dataIndex: "debt",
            key: "debt",
            width: "10%",
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
            .post("api/oil/station/incomeFuel", { ...value })
            .then(function (response) {
                message.success("Kelgan yoqilg'i muvofaqiyatli qo'shildi");
                getIncomeFuels(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error("Kelgan yoqilg'ini qo'shishda muammo bo'ldi");
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
            .put(`api/oil/station/incomeFuel/${initial.id}`, { ...data })
            .then((res) => {
                message.success("Kelgan yoqilg'i muvofaqiyatli taxrirlandi");
                getIncomeFuels(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                message.error("Kelgan yoqilg'ini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/oil/station/incomeFuel/${item}`)
                .then((data) => {
                    getIncomeFuels(current - 1, pageSize);
                    message.success("Kelgan Yoqilg'i muvofaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    message.error(
                        "Kelgan Yoqilg'ini o'chirishda muammo bo'ldi"
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

export default IncomeDryFruit;
