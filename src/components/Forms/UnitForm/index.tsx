import { Button, Form, Input } from "antd";
import { UnitFormData } from "../../../requests/Unit";
import { CompanySelect } from "../../Selects/CompanySelect";
import "./index.css";

interface UnitFormProps {
  loading: boolean;
  saveUnit: (data: UnitFormData) => Promise<void>;
  initialValues?: UnitFormData;
}

export const UnitForm = ({
  loading,
  saveUnit,
  initialValues,
}: UnitFormProps) => {
  const [form] = Form.useForm<UnitFormData>();

  return (
    <Form
      onFinish={(values) => {
        saveUnit(values);
      }}
      className="unit-form"
      initialValues={initialValues}
      form={form}
      layout="vertical"
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
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
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="unit-form-button"
          loading={loading}
        >
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};
