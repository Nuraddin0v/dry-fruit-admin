// import { useEffect } from "react";
import {
    Route,
    Routes,
    // , useNavigate
} from "react-router-dom";
// import useToken from "./Hook/UseToken";
// import { useData } from "./Hook/UseData";
import LayoutMenu from "./Components/Layout/Layout";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";

function App() {
    // const { token } = useToken();
    // const navigate = useNavigate();
    // const { user } = useData();

    // useEffect(() => {
    //     // if (!token) {
    //     //     return navigate("/login", { replace: true });
    //     // }
    // }, []);
    return (
        <Routes>
            <Route element={<LayoutMenu />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
            <Route path="server-error" element={<Error500 />} />
        </Routes>
    );
}

export default App;
