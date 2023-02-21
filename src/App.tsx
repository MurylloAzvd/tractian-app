import { Layout } from "antd";
import { HeaderMenu } from "./components/HeaderMenu";
import LogoTractian from "./assets/logo-tractian.svg";
import "antd/dist/reset.css";
import "./App.css";
import { CompaniesList } from "./pages/Company/CompaniesList";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="container">
      <Header className="header">
        <img src={LogoTractian} alt="Tractian" className="header-logo" />
        <HeaderMenu />
      </Header>
      <Content className="content">
        <CompaniesList />
      </Content>
    </Layout>
  );
}

export default App;
