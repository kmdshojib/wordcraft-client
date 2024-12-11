import { FC } from "react";
import { Route, Routes } from "react-router";
import { routes, secureRoutes } from "../routes/routes";
import Navbar from "../components/Nav/Navbar";
import SecureRoute from "../routes/SecureRoute";



const Layout: FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
        {
          secureRoutes.map((route, index) =>
            <Route
              key={index}
              path={route.path}
              element={
                <SecureRoute>
                  {<route.element />}
                </SecureRoute>
              }
            />)
        }


      </Routes>
    </div>
  );
};


export default Layout;