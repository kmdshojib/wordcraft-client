import { ReactNode, FC, useRef } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../hooks/useAppContext";
import { message } from "antd";

interface SecureRouteProps {
    children: ReactNode;
}

const SecureRoute: FC<SecureRouteProps> = ({ children }) => {
    const { user }: any = useAppContext();
    const hasShownMessage = useRef(false);

    if (!user) {
        if (!hasShownMessage.current) {
            message.error("Please login to access this page.");
            hasShownMessage.current = true;
        }
        return <Navigate to="/login" replace />;
    }

    if (user.role === "admin") {
        <Navigate to="/dashboard" replace />;
    } else {
        <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default SecureRoute;
