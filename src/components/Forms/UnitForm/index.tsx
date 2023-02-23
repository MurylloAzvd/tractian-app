import { Button, Form, Input } from "antd";
import { UnitFormData } from "../../../requests/Unit";
import { CompanySelect } from "../../Selects/CompanySelect";

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
        label="Empresa"
        name="companyId"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <CompanySelect
          onChange={(value) => form.setFieldsValue({ companyId: value })}
          value={form.getFieldsValue().companyId}
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
