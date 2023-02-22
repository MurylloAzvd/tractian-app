import { Breadcrumb, Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../../../contexts/message";
import { CompanyFormData, createCompany } from "../../../requests/Company";
import { routePaths } from "../../../routes";
import "./index.css";

export const CompanyCreation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = useMessage();

  const saveCompany = async (data: CompanyFormData) => {
    try {
      setLoading(true);
      await createCompany(data);
      message.success("Empresa salva com sucesso");
      navigate(routePaths.company.list);
    } catch (error) {
      message.error("Erro ao salvar empresa");
    } finally {
      setLoading(false);
    }
  };

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
          saveCompany(values);
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
            loading={loading}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
