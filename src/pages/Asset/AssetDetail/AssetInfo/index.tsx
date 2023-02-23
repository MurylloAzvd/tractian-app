import { Col, Image, Row } from "antd";
import { Asset } from "../../../../requests/Asset";
import { AssetDescriptions } from "./AssetDescriptions";
import { HealthHistoryChart } from "./HealthHistoryChart";
import "./index.css";

interface AssetInfoProps {
  asset: Asset;
}

export const AssetInfo = ({ asset }: AssetInfoProps) => {
  return (
    <Row className="asset-info" gutter={[24, 24]}>
      <Col span={24}>
        <AssetDescriptions asset={asset} />
      </Col>
      <Col xs={24} md={8}>
        <Image src={asset.image} />
      </Col>
      <Col xs={24} md={16}>
        <HealthHistoryChart asset={asset} />
      </Col>
    </Row>
  );
};
