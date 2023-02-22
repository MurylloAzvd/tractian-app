import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useMessage } from "../../../contexts/message";
import { deleteUnit, getUnits, Unit } from "../../../requests/Unit";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";

export const UnitsList = () => {
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<Unit[]>([]);
  const { message } = useMessage();

  const fetchUnits = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUnits();
      setUnits(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de unidades");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const handleDeleteUnit = async (id: number) => {
    try {
      await deleteUnit(id);
      message.success("Unidade deletada com sucesso");
      fetchUnits();
    } catch (error) {
      message.error("Erro ao deletar unidade");
    }
  };

  const columns: ColumnsType<Unit> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "ID da empresa",
      dataIndex: "companyId",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      width: 120,
      render: (_, record) => (
        <Space>
          <Link
            to={routePaths.unit.update.replace(":id", record.id.toString())}
          >
            <Button icon={<EditFilled />} type="link" />
          </Link>
          <Popconfirm
            title="Deletar unidade"
            description="Você tem certeza que deseja deletar essa unidade?"
            onConfirm={() => handleDeleteUnit(record.id)}
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
        title="Unidades"
        addButton={{
          label: "Criar unidade",
          routePath: routePaths.unit.creation,
        }}
      />
      <Table
        dataSource={units}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};
