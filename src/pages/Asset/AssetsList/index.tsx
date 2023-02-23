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
    },
    {
      title: "ID da unidade",
      dataIndex: "unitId",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Modelo",
      dataIndex: "model",
    },
    {
      title: "Saúde",
      dataIndex: "healthscore",
      render: (value) => <span>{value}%</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => <AssetStatusTag status={value} />,
    },
    {
      width: 120,
      render: (_, record) => (
        <Space>
          <Link
            to={routePaths.user.update.replace(":id", record.id.toString())}
          >
            <Button icon={<EditFilled />} type="link" />
          </Link>
          <Popconfirm
            title="Deletar usuário"
            description="Você tem certeza que deseja deletar esse usuário?"
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
          label: "Criar usuário",
          routePath: routePaths.user.creation,
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
