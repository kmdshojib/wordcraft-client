import { ComponentType } from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import LessonHome from "../pages/LessonHome";
import TutorialPage from "../pages/TutorialPage";
import LessonPage from "../pages/LessonPage";

type AppRoute = {
    path: string;
    element: ComponentType;
};



export const routes: AppRoute[] = [
    { path: "/", element: LessonHome },
    { path: "/login", element: Login },
    { path: "/register", element: Registration },
    { path: "/tutorial", element: TutorialPage },
    { path: "/lesson/:id", element: LessonPage}
];
