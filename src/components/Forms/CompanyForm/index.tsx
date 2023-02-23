import { Button, Form, Input } from "antd";
import { CompanyFormData } from "../../../requests/Company";
import "./index.css";

interface CompanyFormProps {
  loading: boolean;
  saveCompany: (data: CompanyFormData) => Promise<void>;
  initialValues?: CompanyFormData;
}

export const CompanyForm = ({
  loading,
  saveCompany,
  initialValues,
}: CompanyFormProps) => {
  return (
    <Form
      onFinish={(values) => {
        saveCompany(values);
      }}
      className="company-form"
      initialValues={initialValues}
      layout="vertical"
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
  );
};
