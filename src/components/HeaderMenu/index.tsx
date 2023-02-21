import { useState } from "react";
import { Menu } from "antd";
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

  const screens = useBreakpoint();

  return (
    <>
      {screens.lg ? (
        <Menu
          onClick={(e) => {
            setCurrent(e.key);
          }}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
          theme="dark"
        />
      ) : (
        <Button type="default">
          <MenuOutlined />
        </Button>
      )}
    </>
  );
};
