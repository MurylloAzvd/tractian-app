import { Card, Col, Row, Statistic } from "antd";
import { AssetStatusCount } from "../../../components/AssetStatusCount";
import { Asset, AssetStatus } from "../../../requests/Asset";

interface AssetsIndicatorsProps {
  assets: Asset[];
}

export const AssetsIndicators = ({ assets }: AssetsIndicatorsProps) => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={12} md={6}>
        <Card>
          <Statistic title="Total de ativos" value={assets.length} />
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <AssetStatusCount
          count={
            assets.filter((asset) => asset.status === AssetStatus.inOperation)
              .length
          }
          status={AssetStatus.inOperation}
        />
      </Col>
      <Col xs={12} md={6}>
        <AssetStatusCount
          count={
            assets.filter((asset) => asset.status === AssetStatus.inDowntime)
              .length
          }
          status={AssetStatus.inDowntime}
        />
      </Col>
      <Col xs={12} md={6}>
        <AssetStatusCount
          count={
            assets.filter((asset) => asset.status === AssetStatus.inAlert)
              .length
          }
          status={AssetStatus.inAlert}
        />
      </Col>
    </Row>
  );
};
