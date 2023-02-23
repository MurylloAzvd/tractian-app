import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import {
  Asset,
  AssetFormData,
  getAsset,
  updateAsset,
} from "../../../requests/Asset";
import { AssetForm } from "../../../components/Forms/AssetForm";

export const AssetUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<Asset>();
  const navigate = useNavigate();
  const { message } = useMessage();
  const params = useParams();

  const assetId = Number(params.id);

  const saveAsset = async (data: AssetFormData) => {
    try {
      setLoading(true);
      await updateAsset(assetId, data);
      message.success("Ativo salvo com sucesso");
      navigate(routePaths.asset.list);
    } catch (error) {
      message.error("Erro ao salvar ativo");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.asset.list}>Ativos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Editar</Breadcrumb.Item>
      </Breadcrumb>
      {asset && (
        <AssetForm
          loading={loading}
          saveAsset={saveAsset}
          initialValues={asset}
        />
      )}
    </>
  );
};
