import { Layout } from "antd";
import { HeaderMenu } from "./components/HeaderMenu";
import { Routes } from "./routes";
import LogoTractian from "./assets/logo-tractian.svg";
import "antd/dist/reset.css";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="container">
      <Header className="header">
        <img src={LogoTractian} alt="Tractian" className="header-logo" />
        <HeaderMenu />
      </Header>
      <Content className="content">
        <Routes />
      </Content>
    </Layout>
  );
}

export default App;
