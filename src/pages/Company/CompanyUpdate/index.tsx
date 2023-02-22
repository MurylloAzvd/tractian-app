import { Breadcrumb, Button, Form, Input } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMessage } from "../../../contexts/message";
import {
  Company,
  CompanyFormData,
  getCompany,
  updateCompany,
} from "../../../requests/Company";
import { routePaths } from "../../../routes";
import "./index.css";

export const CompanyUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company>();
  const navigate = useNavigate();
  const { message } = useMessage();
  const params = useParams();

  const companyId = Number(params.id);

  const saveCompany = async (data: CompanyFormData) => {
    try {
      setLoading(true);
      await updateCompany(companyId, data);
      message.success("Empresa salva com sucesso");
      navigate(routePaths.company.list);
    } catch (error) {
      message.error("Erro ao salvar empresa");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = useCallback(async () => {
    try {
      const data = await getCompany(companyId);
      setCompany(data);
    } catch (error) {
      message.error("Erro ao carregar a empresa");
    } finally {
      setLoading(false);
    }
  }, [companyId, message]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.company.list}>Empresas</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Editar</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        onFinish={(values) => {
          saveCompany(values);
        }}
        className="company-form"
        disabled={loading}
        initialValues={company}
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
