import { Layout } from "antd";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { routePaths } from "../../routes";
import { HeaderMenu } from "../HeaderMenu";
import LogoTractian from "../../assets/logo-tractian.svg";
import "./index.css";

interface BaseLayout {
  children: ReactNode;
}

const { Header, Content } = Layout;

export const LayoutBase = ({ children }: BaseLayout) => {
  return (
    <Layout className="container">
      <Header className="header">
        <Link to={routePaths.home}>
          <img src={LogoTractian} alt="Tractian" className="header-logo" />
        </Link>
        <HeaderMenu />
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  );
};
