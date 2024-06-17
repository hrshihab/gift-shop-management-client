import { TMenuItem, TUserPath } from "../types";

export const sideBarItemsGenerator = (items: TUserPath[], role: string) => {
    const sidebarItems = items.reduce((acc: TMenuItem[], item) => {
        if (item.path && item.name) {
            acc.push({
                name: item.name,
                path: `/${role}/${item.path}`,
                icon: item?.icon,
            });
        }

        if (item.children) {
            acc.push({
                name: item.name || (item.path as string),
                path: `/${role}/${item.path}`,
                icon: item?.icon,
                menus: item.children
                    .filter((child) => child.name) // Filter out undefined values
                    .map((child) => ({
                        name: child.name,
                        path: `/${role}/${child.path}`,
                    })) as { name: string; path: string }[],
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
