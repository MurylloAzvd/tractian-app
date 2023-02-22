import { Breadcrumb, Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { routePaths } from "../../../routes";
import "./index.css";

export const CompanyCreation = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.company.list}>Empresas</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Criar</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        onFinish={(values) => {
          console.log(values);
        }}
        className="company-form"
      >
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: "Campo obrigatório" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="company-form-button"
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
