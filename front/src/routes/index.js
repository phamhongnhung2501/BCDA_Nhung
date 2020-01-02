import async from "../components/Async";

import {
    Layout as LayoutIcon,
    Sliders as SlidersIcon,
    Users as UsersIcon,
} from "react-feather";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Stations
import Stations from "../pages/station/Stations"

// Pages
import Profile from "../pages/profile/Profile";
import TrackSoilMoisture from "../pages/TrackSoilMoisture/TrackSoilMoisture";
import Admin from "../pages/admin/Admin";
import ControlStation from "../pages/ControlStation/ControlStation";
import Config from "../pages/Config/Config";
import TrackingCamera from "../pages/TrackingCamera/TrackingCamera";


// import Root from "../pages/root/root";
// import Term from "../pages/term/Term";
import Dashboard from "../pages/dashboards/Dashboard";
import VerifyAccount from "../pages/auth/VerifyAccount";
const Default = async(() => import("../pages/station/Stations"));

const dashboardWithoutSidebarRoutes = {
    path: "/dashboard",
    name: "Dashboard",
    header: "Main",
    icon: SlidersIcon,
    containsHome: true,
    children: [
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "/TrackSoilMoisture",
            name: "TrackSoilMoisture",
            component: TrackSoilMoisture
        },
        {
            path: "/ControlStation",
            name: "ControlStation",
            component: ControlStation
        },
        {
            path: "/TrackingCamera",
            name: "TrackingCamera",
            component: TrackingCamera
        },
        {
            path: "/Config",
            name: "Config",
            component: Config
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile
        },
        {
            path: "/farms/admin",
            name: "Admin Page",
            component: Admin
        },


    ]
};


const pageRoutes = {
    path: "/farms",
    name: "Stations",
    icon: LayoutIcon,
    component: Default
};

const authRoutes = {
    path: "/auth",
    name: "Auth",
    icon: UsersIcon,
    badgeColor: "secondary",
    badgeText: "12/24",
    children: [
        {
            path: "/auth/sign-in",
            name: "Sign In",
            component: SignIn
        },
        {
            path: "/auth/sign-up",
            name: "Sign Up",
            component: SignUp
        },
        {
            path: "/auth/verify-account",
            name: "Verify Account",
            component: VerifyAccount
        },
        // {
        //     path: "/auth/active-user",
        //     name: "Active User",
        //     component: ActiveUser
        // },
        {
            path: "/auth/reset-password",
            name: "Reset Password",
            component: ResetPassword
        },
        {
            path: "/auth/404",
            name: "404 Page",
            component: Page404
        },
        {
            path: "/auth/500",
            name: "500 Page",
            component: Page500
        }
    ]
};

const landingRoutes = {
    path: "/",
    name: "Landing Page",
    children: [
        {
            path: "/farms",
            name: "List Stations Page",
            component: Stations
        },
        // {
        //     path: "/term",
        //     name: "Term Page",
        //     component: Term
        // }
    ]
};
export const landing = [landingRoutes];
// Dashboard specific routes
export const dashboard = [
    pageRoutes,
];

// Auth specific routes
export const page = [authRoutes];

export const dashboardWithoutSidebar = [dashboardWithoutSidebarRoutes];

// All routes
export default [
    dashboardWithoutSidebarRoutes,
    pageRoutes,
    authRoutes,
];
