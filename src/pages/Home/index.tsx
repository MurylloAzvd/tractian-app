import { Col, Row, Spin, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { CompanySelect } from "../../components/Selects/CompanySelect";
import { UnitSelect } from "../../components/Selects/UnitSelect";
import { useMessage } from "../../contexts/message";
import { Asset, AssetsParams, getAssets } from "../../requests/Asset";
import { AssetsIndicators } from "./AssetsIndicators";
import { HealthScoreChart } from "./HealthScoreChart";

const { Text } = Typography;

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([]);
  const { message } = useMessage();
  const [filterParams, setFilterParams] = useState<AssetsParams>();

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAssets(filterParams);
      setAssets(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de ativos");
    } finally {
      setLoading(false);
    }
  }, [message, filterParams]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <>
      <Row justify="start" gutter={16}>
        <Col xs={12} sm={6}>
          <Text type="secondary">Empresa: </Text>
          <CompanySelect
            onChange={(value) => {
              setFilterParams((prevState) => ({
                ...prevState,
                companyId: value === -1 ? undefined : value,
              }));
            }}
            allOption
          />
        </Col>
        <Col xs={12} sm={6}>
          <Text type="secondary">Unidade: </Text>
          <UnitSelect
            onChange={(value) => {
              setFilterParams((prevState) => ({
                ...prevState,
                unitId: value === -1 ? undefined : value,
              }));
            }}
            allOption
          />
        </Col>
      </Row>
      {loading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <>
          <AssetsIndicators assets={assets} />
          <HealthScoreChart assets={assets} />
        </>
      )}
    </>
  );
};
