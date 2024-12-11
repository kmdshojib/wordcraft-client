import { ComponentType } from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
type AppRoute = {
    path: string;
    element: ComponentType;
};



export const routes: AppRoute[] = [
    { path: "/login", element: Login },
    {path: "/register", element: Registration}
];
