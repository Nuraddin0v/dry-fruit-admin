import { useState } from "react";
import instance from "../Api/Axios";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useData } from "../Hook/UseData";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { categoryData } = useData();

    const getClients = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/dry/fruit/api/dry/fruit/client/pageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                setClients(data.data.data.fuelReports);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((error) => {
                console.error(error);
                message.error("Klientlarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Klient nomi",
            dataIndex: "fio",
            key: "fio",
            width: "33%",
            search: true,
        },
        {
            title: "Klient nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "33%",
            search: false,
        },
        {
            title: "Klient addressi",
            dataIndex: "address",
            key: "address",
            width: "33%",
            search: false,
            sorter: (a, b) => {
                if (a.address < b.address) {
                    return -1;
                }
                if (a.address > b.address) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        instance
            .post(
                `api/dry/fruit/api/dry/fruit/client?fio=${values.fio}&phoneNumber=${values.phoneNumber}&address=${values.address}`
            )
            .then(function (response) {
                message.success("Klient muvofaqiyatli qo'shildi");
                getClients(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                message.error("Klientni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        console.log(initial.id);
        setLoading(true);
        instance
            .put(
                `api/dry/fruit/api/dry/fruit/client?id=${initial.id}&fio=${values.fio}&phoneNumber=${values.phoneNumber}&address=${values.address}&deleted=false`
            )
            .then((res) => {
                message.success("Klient muvofaqiyatli taxrirlandi");
                getClients(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                message.error("Klientni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/dry/fruit/api/dry/fruit/client/${item}`)
                .then((data) => {
                    getClients(current - 1, pageSize);
                    message.success("Klient muvofaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    message.error("Klientni o'chirishda muammo bo'ldi");
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
                getData={getClients}
                columns={columns}
                tableData={clients}
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

export default Clients;
