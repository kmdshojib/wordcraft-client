import { ComponentType } from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import TutorialPage from "../pages/TutorialPage";

type AppRoute = {
    path: string;
    element: ComponentType;
};



export const routes: AppRoute[] = [
    { path: "/", element: Home },
    { path: "/login", element: Login },
    { path: "/register", element: Registration },
    { path: "/tutorial", element: TutorialPage }
];
