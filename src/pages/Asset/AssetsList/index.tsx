import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";
import { Asset, deleteAsset, getAssets } from "../../../requests/Asset";
import { AssetStatusTag } from "../../../components/AssetStatusTag";

export const AssetsList = () => {
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

  const handleDeleteAsset = async (id: number) => {
    try {
      await deleteAsset(id);
      message.success("Ativo deletado com sucesso");
      fetchAssets();
    } catch (error) {
      message.error("Erro ao deletar ativo");
    }
  };

  const columns: ColumnsType<Asset> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "ID da empresa",
      dataIndex: "companyId",
      responsive: ["md"],
    },
    {
      title: "ID da unidade",
      dataIndex: "unitId",
      responsive: ["md"],
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Modelo",
      dataIndex: "model",
      responsive: ["sm"],
    },
    {
      title: "Saúde",
      dataIndex: "healthscore",
      render: (value) => <span>{value}%</span>,
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => <AssetStatusTag status={value} />,
      responsive: ["sm"],
    },
    {
      width: 120,
      render: (_, record) => (
        <Space>
          <Link
            to={routePaths.asset.update.replace(":id", record.id.toString())}
          >
            <Button icon={<EditFilled />} type="link" />
          </Link>
          <Popconfirm
            title="Deletar ativo"
            description="Você tem certeza que deseja deletar esse ativo?"
            onConfirm={() => handleDeleteAsset(record.id)}
            okText="Sim"
            cancelText="Não"
            placement="topRight"
          >
            <Button icon={<DeleteFilled />} type="link" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ListPageHeader
        title="Ativos"
        addButton={{
          label: "Criar ativo",
          routePath: routePaths.asset.creation,
        }}
      />
      <Table
        dataSource={assets}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};
