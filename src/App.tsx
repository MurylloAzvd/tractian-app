import React from "react";
import { Col, Layout, Menu, Row } from "antd";

import LogoTractian from "./assets/logo-tractian.svg";

import "antd/dist/reset.css";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Row align="middle" justify="space-between">
          <Col>
            <img src={LogoTractian} alt="Tractian" className="header-logo" />
          </Col>
          <Col>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={new Array(4).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: `nav ${key}`,
                };
              })}
            />
          </Col>
        </Row>
      </Header>
      <Content>content</Content>
    </Layout>
  );
}

export default App;
