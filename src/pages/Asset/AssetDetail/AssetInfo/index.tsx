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
    <div className="asset-info">
      <Row>
        <AssetDescriptions asset={asset} />
      </Row>
      <Row gutter={20}>
        <Col span={8}>
          <Image src={asset.image} />
        </Col>
        <Col span={16}>
          <HealthHistoryChart asset={asset} />
        </Col>
      </Row>
    </div>
  );
};
