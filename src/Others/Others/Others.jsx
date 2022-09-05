import BranchVsRole from "../BranchVsRole/BranchVsRole";
import CategoryVsMeasurement from "../CategoryVsMeasurement/CategoryVsMeasurement";

const Others = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <BranchVsRole />
            <CategoryVsMeasurement />
        </div>
    );
};

export default Others;
