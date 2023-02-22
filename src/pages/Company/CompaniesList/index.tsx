import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useMessage } from "../../../contexts/message";
import {
  Company,
  deleteCompany,
  getCompanies,
} from "../../../requests/Company";
import { routePaths } from "../../../routes";
import { ListPageHeader } from "../../../components/ListPageHeader";

export const CompaniesList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { message } = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de empresas");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleDeleteCompany = async (id: number) => {
    try {
      await deleteCompany(id);
      message.success("Empresa deletada com sucesso");
      fetchCompanies();
    } catch (error) {
      message.error("Erro ao deletar empresa");
    }
  };

  const columns: ColumnsType<Company> = [
    {
      title: "ID",
      dataIndex: "id",
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
            to={routePaths.company.update.replace(":id", record.id.toString())}
          >
            <Button icon={<EditFilled />} type="link" />
          </Link>
          <Popconfirm
            title="Deletar empresa"
            description="Você tem certeza que deseja deletar essa empresa?"
            onConfirm={() => handleDeleteCompany(record.id)}
            okText="Sim"
            cancelText="Não"
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
        title="Empresas"
        addButton={{
          label: "Criar empresa",
          routePath: routePaths.company.creation,
        }}
      />
      <Table
        dataSource={companies}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};
