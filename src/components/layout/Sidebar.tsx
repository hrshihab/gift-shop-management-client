import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { studentPaths } from "../../routes/student.routes";
const { Sider } = Layout;

// const items = [
//   {
//     key: "1",
//     label: "Option 1",
//   },
//   {
//     key: "2",
//     label: "Option 2",
//     children: [
//       {
//         key: "2-1",
//         label: "Option 2-1",
//       },
//       {
//         key: "2-2",
//         label: "Option 2-2",
//       },
//     ],
//   },
//   {
//     key: "3",
//     label: "Option 3",
//   },
//   {
//     key: "4",
//     label: "Option 4",
//   },
// ];
const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = userRole.ADMIN;
  let sidebarItems;
  switch (user) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;

    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "32px",
          margin: "16px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Gift-Shop</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
