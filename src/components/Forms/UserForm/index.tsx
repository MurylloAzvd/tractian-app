import { Button, Form, Input } from "antd";
import { UserFormData } from "../../../requests/User";
import { CompanySelect } from "../../Selects/CompanySelect";
import { UnitSelect } from "../../Selects/UnitSelect";

interface UserFormProps {
  loading: boolean;
  saveUser: (data: UserFormData) => Promise<void>;
  initialValues?: UserFormData;
}

export const UserForm = ({
  loading,
  saveUser,
  initialValues,
}: UserFormProps) => {
  const [form] = Form.useForm<UserFormData>();

  return (
    <Form
      onFinish={(values) => {
        saveUser(values);
      }}
      className="form"
      initialValues={initialValues}
      layout="vertical"
      form={form}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Campo obrigatório" },
          { type: "email", message: "E-mail inválido" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Empresa"
        name="companyId"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <CompanySelect
          onChange={(value) => form.setFieldsValue({ companyId: value })}
          value={form.getFieldsValue().companyId}
        />
      </Form.Item>{" "}
      <Form.Item
        label="Unidade"
        name="unitId"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <UnitSelect
          onChange={(value) => form.setFieldsValue({ unitId: value })}
          value={form.getFieldsValue().unitId}
        />
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
