import { Col, Image, Row } from "antd";
import { Asset } from "../../../../requests/Asset";
import { HealthHistoryChart } from "./HealthHistoryChart";

interface AssetInfoProps {
  asset: Asset;
}

export const AssetInfo = ({ asset }: AssetInfoProps) => {
  return (
    <>
      <Row>
        <Col span={8}>
          <Image src={asset.image} />
        </Col>
        <Col span={16}>
          <HealthHistoryChart asset={asset} />
        </Col>
      </Row>
    </>
  );
};
