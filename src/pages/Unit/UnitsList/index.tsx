import { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMessage } from "../../../contexts/message";
import { deleteUnit, getUnits, Unit } from "../../../requests/Unit";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";
import { TableActionButtons } from "../../../components/TableActionButtons";

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
      responsive: ["md"],
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      width: 120,
      render: (_, record) => (
        <TableActionButtons
          updateRoutePath={routePaths.unit.update.replace(
            ":id",
            record.id.toString()
          )}
          deleteButton={{
            title: "Deletar unidade",
            description: "Você tem certeza que deseja deletar essa unidade?",
            onConfirm: () => handleDeleteUnit(record.id),
          }}
        />
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
