import AddProduct from "../pages/Manager/ProductManagement/AddProduct";
import CopyProduct from "../pages/Manager/ProductManagement/CopyProduct";
import UpdateProduct from "../pages/Manager/ProductManagement/UpdateProduct";
import Dashboard from "../pages/Dashboard";
import GiftProducts from "../pages/GiftProducts";
import { MdDashboard, MdShoppingCart } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import ManageGiftProducts from "../pages/ManageGiftProduct";

export const managerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: MdDashboard,
        element: <Dashboard />,
    },
    {
        name: "Gift List",
        path: "gift-list",
        icon: FaGift,
        element: <GiftProducts />,
    },
    {
        name: "Products",
        icon: MdShoppingCart,
        children: [
            {
                name: "Manage Gifts",
                path: "manage-gifts",
                element: <ManageGiftProducts />,
            },
            {
                name: "Add Gift",
                path: "add-gift",
                element: <AddProduct />,
            },
            {
                path: "update-gift/:productId",
                element: <UpdateProduct />,
            },
            {
                path: "add-gift/copied/:productId",
                element: <CopyProduct />,
            },
        ],
    },
];
