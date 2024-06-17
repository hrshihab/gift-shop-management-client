import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import LoginRoute from "../components/layout/LoginRoute";
import { routeGenerator } from "../utils/routeGenerator";
import { managerPaths } from "./manager.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ForgetPassword from "../pages/ForgetPassword";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/Dashboard";
import Invoice from "../pages/invoice";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/products/cart",
                element: (
                    <ProtectedRoute role="all">
                        <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/products/cart/check-out",
                element: (
                    <ProtectedRoute role="all">
                        <Checkout />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/products/cart/check-out/invoice/:id",
                element: (
                    <ProtectedRoute role="all">
                        <Invoice />
                    </ProtectedRoute>
                ),
            },
        ],
    },

    {
        path: "/manager",
        element: (
            <ProtectedRoute role="manager">
                <App />
            </ProtectedRoute>
        ),
        children: routeGenerator(managerPaths),
    },
    {
        path: "/login",
        element: (
            <LoginRoute>
                <Login />
            </LoginRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <LoginRoute>
                <Registration />
            </LoginRoute>
        ),
    },
    {
        path: "/forget-password",
        element: (
            <LoginRoute>
                <ForgetPassword />
            </LoginRoute>
        ),
    },
    {
        path: "*",
        element: <div>Not found!</div>,
    },
]);

export default router;
