import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuProps, Grid, Button, Drawer, Menu } from "antd";
import {
  BankOutlined,
  PushpinOutlined,
  SettingOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;

const items: MenuProps["items"] = [
  {
    label: "Empresas",
    key: "empresas",
    icon: <BankOutlined />,
  },
  {
    label: "Unidades",
    key: "unidades",
    icon: <PushpinOutlined />,
  },
  {
    label: "Usuários",
    key: "usuarios",
    icon: <UserOutlined />,
  },
  {
    label: "Ativos",
    key: "ativos",
    icon: <SettingOutlined />,
  },
];

export const HeaderMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { pathname } = useLocation();

  const mainPath = pathname.split("/")[1];

  return (
    <>
      {screens.lg ? (
        <Menu
          selectedKeys={[mainPath]}
          items={items}
          mode="horizontal"
          theme="dark"
          onClick={(e) => {
            navigate(e.key);
          }}
        />
      ) : (
        <>
          <Button onClick={() => setIsSideMenuOpen(true)}>
            <MenuOutlined />
          </Button>
          <Drawer
            open={isSideMenuOpen}
            onClose={() => setIsSideMenuOpen(false)}
            bodyStyle={{ padding: "24px 0" }}
          >
            <Menu
              selectedKeys={[mainPath]}
              items={items}
              mode="vertical"
              theme="light"
              onClick={(e) => {
                navigate(e.key);
              }}
            />
          </Drawer>
        </>
      )}
    </>
  );
};
