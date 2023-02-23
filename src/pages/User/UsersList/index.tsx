import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";
import { deleteUser, getUsers, User } from "../../../requests/User";

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
      title: "Email",
      dataIndex: "email",
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
            onConfirm={() => handleDeleteUser(record.id)}
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
