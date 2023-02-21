import { useState } from "react";
import { Drawer, Menu } from "antd";
import { MenuProps, Grid, Button } from "antd";
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
    key: "companies",
    icon: <BankOutlined />,
  },
  {
    label: "Unidades",
    key: "units",
    icon: <PushpinOutlined />,
  },
  {
    label: "Usuários",
    key: "users",
    icon: <UserOutlined />,
  },
  {
    label: "Ativos",
    key: "assets",
    icon: <SettingOutlined />,
  },
];

export const HeaderMenu = () => {
  const [current, setCurrent] = useState("companies");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const screens = useBreakpoint();

  return (
    <>
      {screens.lg ? (
        <Menu
          onClick={(e) => {
            setCurrent(e.key);
          }}
          selectedKeys={[current]}
          items={items}
          mode="horizontal"
          theme="dark"
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
              onClick={(e) => {
                setCurrent(e.key);
              }}
              selectedKeys={[current]}
              items={items}
              mode="vertical"
              theme="light"
            />
          </Drawer>
        </>
      )}
    </>
  );
};
