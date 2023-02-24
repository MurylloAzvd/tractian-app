import { Card, Statistic } from "antd";
import {
  CheckCircleOutlined,
  WarningOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { AssetStatus } from "../../requests/Asset";

interface AssetStatusCountProps {
  status: AssetStatus;
  count: number;
}

export const AssetStatusCount = ({ status, count }: AssetStatusCountProps) => {
  if (status === AssetStatus.inAlert) {
    return (
      <Card>
        <Statistic
          title="Em alerta"
          value={count}
          valueStyle={{ color: "#cf1322" }}
          prefix={<WarningOutlined />}
        />
      </Card>
    );
  }

  if (status === AssetStatus.inDowntime) {
    return (
      <Card>
        <Statistic title="Em parada" value={count} prefix={<StopOutlined />} />
      </Card>
    );
  }

  return (
    <Card>
      <Statistic
        title="Em operação"
        value={count}
        valueStyle={{ color: "#3f8600" }}
        prefix={<CheckCircleOutlined />}
      />
    </Card>
  );
};
