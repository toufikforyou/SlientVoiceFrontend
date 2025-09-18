import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    if (user) {
        return children;
    }
    return <Navigate to='/signin'></Navigate>
};

export default PrivateRoute;