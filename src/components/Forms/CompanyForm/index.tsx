import { Button, Form, Input } from "antd";
import { CompanyFormData } from "../../../requests/Company";

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
      className="form"
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
          className="form-submit-button"
          loading={loading}
        >
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
