import { ComponentType } from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import LessonHome from "../pages/LessonHome";
import TutorialPage from "../pages/TutorialPage";
import LessonPage from "../pages/LessonPage";
import AdminPage from "../pages/Admin";
import NotFoundPage from "../pages/404";

type AppRoute = {
    path: string;
    element: ComponentType;
};

export const routes: AppRoute[] = [
    { path: "/", element: Login },
    { path: "/register", element: Registration },
    {path: "*", element: NotFoundPage}
];

export const secureRoutes: AppRoute[] = [
    { path: "/dashboard", element: AdminPage },
    { path: "/lessons", element: LessonHome },
    { path: "/tutorial", element: TutorialPage },
    { path: "/lesson/:id", element: LessonPage },
];
