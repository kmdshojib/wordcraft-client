import { ReactNode, FC } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";
import { message } from "antd";


interface SecureRouteProps {
    children: ReactNode;
}

const SecureRoute: FC<SecureRouteProps> = ({ children }) => {
    const { user } = useAppContext()

    if (!user) {
        message.error("Please login to access this page.")
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default SecureRoute;
