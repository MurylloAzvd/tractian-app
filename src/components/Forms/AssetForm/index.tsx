import { Button, Form, Input, InputNumber, Typography } from "antd";
import { AssetFormData } from "../../../requests/Asset";
import { CompanySelect } from "../../Selects/CompanySelect";
import { UnitSelect } from "../../Selects/UnitSelect";

const { Text } = Typography;

interface AssetFormProps {
  loading: boolean;
  saveAsset: (data: AssetFormData) => Promise<void>;
  initialValues?: AssetFormData;
}

export const AssetForm = ({
  loading,
  saveAsset,
  initialValues,
}: AssetFormProps) => {
  const [form] = Form.useForm<AssetFormData>();

  return (
    <Form
      onFinish={(values) => {
        saveAsset(values);
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
        label="Modelo"
        name="model"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Text type="secondary">Especificações</Text>
      <Form.Item
        label="Temperatura máxima (°C)"
        name={["specifications", "maxTemp"]}
      >
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item label="Potência (kWh)" name={["specifications", "power"]}>
        <InputNumber type="number" />
      </Form.Item>
      <Form.Item label="RPM" name={["specifications", "rpm"]}>
        <InputNumber type="number" />
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
