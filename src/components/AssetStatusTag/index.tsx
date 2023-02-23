import { Tag } from "antd";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { AssetStatus } from "../../requests/Asset";

interface AssetStatusTagProps {
  status: AssetStatus;
}

export const AssetStatusTag = ({ status }: AssetStatusTagProps) => {
  if (status === AssetStatus.inAlert) {
    return (
      <Tag icon={<ExclamationCircleOutlined />} color="warning">
        Em alerta
      </Tag>
    );
  }

  if (status === AssetStatus.inDowntime) {
    return (
      <Tag icon={<MinusCircleOutlined />} color="default">
        Em parada
      </Tag>
    );
  }

  return (
    <Tag icon={<CheckCircleOutlined />} color="success">
      Em operação
    </Tag>
  );
};
