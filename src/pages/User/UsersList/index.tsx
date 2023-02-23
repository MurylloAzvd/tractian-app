import { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";
import { deleteUser, getUsers, User } from "../../../requests/User";
import { TableActionButtons } from "../../../components/TableActionButtons";

export const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const { message } = useMessage();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de usuários");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      message.success("Usuário deletado com sucesso");
      fetchUsers();
    } catch (error) {
      message.error("Erro ao deletar usuário");
    }
  };

  const columns: ColumnsType<User> = [
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
      title: "E-mail",
      dataIndex: "email",
      responsive: ["sm"],
    },
    {
      width: 120,
      render: (_, record) => (
        <TableActionButtons
          updateRoutePath={routePaths.user.update.replace(
            ":id",
            record.id.toString()
          )}
          deleteButton={{
            title: "Deletar usuário",
            description: "Você tem certeza que deseja deletar esse usuário?",
            onConfirm: () => handleDeleteUser(record.id),
          }}
        />
      ),
    },
  ];

  return (
    <>
      <ListPageHeader
        title="Usuários"
        addButton={{
          label: "Criar usuário",
          routePath: routePaths.user.creation,
        }}
      />
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};
