import { Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useMessage } from "../../contexts/message";
import { Asset, getAssets } from "../../requests/Asset";
import { AssetsIndicators } from "./AssetsIndicators";
import { HealthScoreChart } from "./HealthScoreChart";

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
      <>
        <AssetsIndicators assets={assets} />
        <HealthScoreChart assets={assets} />
      </>
    );
  }

  return null;
};
