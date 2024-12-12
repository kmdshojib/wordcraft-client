import { FC } from "react";
import { Route, Routes } from "react-router";
import { routes } from "../routes/routes";
import Navbar from "../components/Nav/Navbar";
// import SecureRoute from "../routes/SecureRoute";
import Footer from "../components/Footer/Footer";


const Layout: FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        {/* {secureRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <SecureRoute>
                <route.element />
              </SecureRoute>
            }
          />
        ))} */}
      </Routes>
      <Footer />
    </div>
  );
};


export default Layout;