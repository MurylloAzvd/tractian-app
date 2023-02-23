import { Breadcrumb } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMessage } from "../../../contexts/message";
import { Asset, getAsset } from "../../../requests/Asset";
import { routePaths } from "../../../routes";
import { AssetInfo } from "./AssetInfo";

export const AssetDetail = () => {
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<Asset>();
  const { message } = useMessage();
  const params = useParams();

  const assetId = Number(params.id);

  const fetchAsset = useCallback(async () => {
    try {
      const data = await getAsset(assetId);
      setAsset(data);
    } catch (error) {
      message.error("Erro ao carregar o ativo");
    } finally {
      setLoading(false);
    }
  }, [assetId, message]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  console.log(loading, asset);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.asset.list}>Ativos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Detalhes</Breadcrumb.Item>
      </Breadcrumb>
      {asset && <AssetInfo asset={asset} />}
    </>
  );
};
