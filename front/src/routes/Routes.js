import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {
    dashboard as dashboardRoutes,
    landing as landingRoutes,
    page as pageRoutes,
    dashboardWithoutSidebar as dashboardWithoutSidebarRoutes
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import AuthLayout from "../layouts/Auth";
import LandingLayout from "../layouts/Landing";
import Page404 from "../pages/auth/Page404";

import Logout from "../controller/Logout"

import ScrollToTop from "../components/ScrollToTop";


const PrivateRoute = (Layout, routes, isSidebar) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout isSidebar={isSidebar}>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
                // Route item without children
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout isSidebar={isSidebar}>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            )
    );

const PublicRoute = (Layout, routes) =>
    routes.map(({ children, path, component: Component }, index) =>
        children ? (
            // Route item with children
            children.map(({ path, component: Component }, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
                // Route item without children
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            )
    );

function Routes() {
    return (

        <Router>
            <ScrollToTop>
                <Switch>
                    <Route exact path="/" render={() => (<Redirect to="/auth/sign-in" />)} />
                    {PublicRoute(LandingLayout, landingRoutes)}
                    <Route
                        path="/logout"
                        render={() => (
                            <Logout />
                        )}
                    />
                    {PublicRoute(AuthLayout, pageRoutes)}
                    {
                        localStorage.getItem('userInfo') !== null ? PrivateRoute(DashboardLayout, dashboardWithoutSidebarRoutes, false) : <Redirect to="/auth/sign-in" />
                    }
                    {
                        localStorage.getItem('project') !== null ? PrivateRoute(DashboardLayout, dashboardRoutes, true) : <Redirect to="/auth/sign-in" />
                    }

                    <Route
                        render={() => (
                            <AuthLayout>
                                <Page404 />
                            </AuthLayout>
                        )}
                    />
                </Switch>
            </ScrollToTop>
        </Router>
    );
}
export default Routes;