import { Card, Col, Row, Spin, Statistic } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AssetStatusCount } from "../../components/AssetStatusCount";
import { useMessage } from "../../contexts/message";
import { Asset, AssetStatus, getAssets } from "../../requests/Asset";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([]);
  const { message } = useMessage();

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAssets();
      setAssets(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de ativos");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (loading) {
    return (
      <Row justify="center">
        <Spin size="large" />
      </Row>
    );
  }

  if (assets) {
    return (
      <Row gutter={[24, 24]}>
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
  }

  return null;
};
