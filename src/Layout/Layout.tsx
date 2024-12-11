import { FC } from "react";
import { Route, Routes } from "react-router";
import { routes } from "../routes/routes";
import Navbar from "../components/Nav/Navbar";


const Layout: FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </div>
  );
};


export default Layout;
