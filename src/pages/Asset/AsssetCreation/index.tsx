import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import { AssetFormData, createAsset } from "../../../requests/Asset";
import { AssetForm } from "../../../components/Forms/AssetForm";

export const AssetCreation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = useMessage();

  const saveAsset = async (data: AssetFormData) => {
    try {
      setLoading(true);
      await createAsset(data);
      message.success("Ativo salvo com sucesso");
      navigate(routePaths.asset.list);
    } catch (error) {
      message.error("Erro ao salvar ativo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.asset.list}>Ativos</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Criar</Breadcrumb.Item>
      </Breadcrumb>
      <AssetForm loading={loading} saveAsset={saveAsset} />
    </>
  );
};
