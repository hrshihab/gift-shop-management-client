import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/feature/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { sideBarItemsGenerator } from "../../utils/sideBarItemsGenerator";
import { managerPaths } from "../../routes/manager.routes";
import { TUser } from "../../types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import SidebarItemWithOutSubMenu from "./SidebarItemWithOutSubMenu";
import SidebarItemWithSubMenu from "./SidebarItemWithSubMenu";
import { useMediaQuery } from "react-responsive";
import NavBar from "./NavBar";

const userRole = {
    MANAGER: "manager",
};

const SideBar = () => {
    const token = useAppSelector(useCurrentToken);
    const dispatch = useAppDispatch();

    let user;

    if (token) {
        user = verifyToken(token);
    } else {
        user = null;
        dispatch(logout());
    }

    let sideBarItems;

    switch ((user as TUser)?.role) {
        case userRole.MANAGER:
            sideBarItems = sideBarItemsGenerator(
                managerPaths,
                userRole.MANAGER,
            );
            break;

        default:
            break;
    }

    const isTabletMode = useMediaQuery({ query: "(max-width: 1280px)" });

    const [isOpen, setIsOpen] = useState(isTabletMode ? false : true);

    const sidebar_animation = isTabletMode
        ? {
              open: {
                  x: 0,
                  y: 0,
                  width: "16rem",
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  x: -250,
                  y: 0,
                  width: 0,
                  transition: {
                      damping: 40,
                      delay: 0.1,
                  },
              },
          }
        : {
              open: {
                  x: 0,
                  y: 0,
                  width: "16rem",
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  x: 0,
                  y: 0,
                  width: "4rem",
                  transition: {
                      damping: 40,
                  },
              },
          };

    useEffect(() => {
        if (isTabletMode) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isTabletMode]);

    return (
        <div
            className={`${
                !isTabletMode && (isOpen ? "w-[16rem]" : "w-[4rem]")
            }`}
        >
            <div
                onClick={() => setIsOpen(false)}
                className={`${!isTabletMode && "hidden"} fixed inset-0 max-h-screen z-[998] bg-black/50 ${
                    isOpen ? "block" : "hidden"
                }`}
            ></div>
            <div className={`${!isTabletMode && "hidden"} sticky top-0`}>
                <NavBar
                    children={
                        <div className="m-3" onClick={() => setIsOpen(true)}>
                            <MdMenu size={30} />
                        </div>
                    }
                />
            </div>
            <motion.div
                variants={sidebar_animation}
                animate={isOpen ? "open" : "closed"}
                className="bg-white top-0 shadow-xl z-[999] w-[16rem] max-w-[16rem] h-screen fixed"
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 font-medium border-b border-slate-300 py-3 mx-3">
                    <img
                        src={
                            "https://sources.com.bd/images/company-logo/20211217101213UwgRFy.png"
                        }
                        alt="logo"
                        width={45}
                    />
                    <span
                        className={`${
                            !isOpen && "hidden"
                        } text-xl font-bold whitespace-pre justify-end mx-1`}
                    >
                        Gift Gallery
                    </span>
                </div>
                {/* Menus */}
                <div className="max-h-full">
                    <ul className="px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium mt-2 mb-20 h-full">
                        {sideBarItems?.map((menu) => (
                            <div key={menu.name}>
                                {!menu?.menus ? (
                                    <SidebarItemWithOutSubMenu
                                        data={menu}
                                        isOpen={isOpen}
                                    />
                                ) : (
                                    <SidebarItemWithSubMenu
                                        key={menu.name}
                                        data={menu}
                                        isOpen={isOpen}
                                    />
                                )}
                            </div>
                        ))}
                    </ul>
                    <div className=""></div>
                </div>
                {/* Controller */}
                <motion.div
                    animate={
                        isOpen
                            ? { x: 0, y: 0, rotate: 0 }
                            : { x: -10, y: 0, rotate: 180 }
                    }
                    className={`absolute w-fit h-fit z-50 right-2 bottom-5 cursor-pointer ${isTabletMode ? "hidden" : "block"} `}
                >
                    <IoIosArrowBack
                        size={25}
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SideBar;
