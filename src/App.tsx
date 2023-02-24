import { BrowserRouter, Link } from "react-router-dom";
import { Layout } from "antd";
import { MessageProvider } from "./contexts/message";
import { HeaderMenu } from "./components/HeaderMenu";
import { routePaths, Router } from "./routes";
import LogoTractian from "./assets/logo-tractian.svg";
import "antd/dist/reset.css";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout className="container">
        <Header className="header">
          <Link to={routePaths.home}>
            <img src={LogoTractian} alt="Tractian" className="header-logo" />
          </Link>
          <HeaderMenu />
        </Header>
        <Content className="content">
          <MessageProvider>
            <Router />
          </MessageProvider>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
