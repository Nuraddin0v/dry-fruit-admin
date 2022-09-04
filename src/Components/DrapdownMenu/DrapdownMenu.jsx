import { Button, Drawer, Menu } from "antd";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import useToken from "../../Hook/UseToken";
// import { useData } from "../../Hook/UseData";

function DrapdownMenu({ onClose, isVisible }) {
    const { token } = useToken();
    const navigate = useNavigate();
    // const { user } = useData();
    const location = useLocation();

    const handleLogOut = e => {
        e.preventDefault();
        sessionStorage.removeItem("token", token);
        navigate("/login");
    };
    return (
        <Drawer
            placement="right"
            closable={false}
            size="200px"
            onClose={onClose}
            visible={isVisible}
        >
            <Menu
                style={{
                    height: "100%",
                }}
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={["6"]}
                mode="inline"
                theme="dark"
                items={[
                    {
                        label: "Bosh Sahifa",
                        key: "/",
                        icon: (
                            <Link to="/">
                                <DashboardOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            </Link>
                        ),
                    },
                    {
                        label: "Profil",
                        key: "/profil",
                        icon: (
                            <Link to="/profil">
                                <UserOutlined style={{ fontSize: "18px" }} />
                            </Link>
                        ),
                    },
                    {
                        label: "Chiqish",
                        key: "/logout",
                        icon: (
                            <Button type="link" onClick={e => handleLogOut(e)}>
                                <LogoutOutlined style={{ fontSize: "18px" }} />
                            </Button>
                        ),
                    },
                ]}
            />
        </Drawer>
    );
}

export default DrapdownMenu;

DrapdownMenu.propTypes = {
    onClose: PropTypes.func,
    isVisible: PropTypes.bool,
};

DrapdownMenu.defaultProps = {
    onClose: e => console.log(e),
    isVisible: false,
};
