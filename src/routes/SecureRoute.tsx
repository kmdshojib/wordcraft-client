import { ReactNode, FC } from "react";
// import { useNavigate } from "react-router";
// import { useAppContext } from "../hooks/useAppContext";
// import { message } from "antd";

interface SecureRouteProps {
    children: ReactNode;
}

const SecureRoute: FC<SecureRouteProps> = ({ children }) => {
    // const { user }: any = useAppContext();
    // const navigate = useNavigate();
    // const [isAuthorized, setIsAuthorized] = useState(false);

    // useEffect(() => {
    //     if (!user) {
    //         message.error("Please login to access this page.");
    //         navigate("/", { replace: true });
    //     } else {
    //         setIsAuthorized(true);
    //     }
    // }, [user, navigate]);

    // if (!isAuthorized) {
    //     return null; // Or return a loading spinner if you prefer
    // }

    return <>{children}</>;
};

export default SecureRoute;