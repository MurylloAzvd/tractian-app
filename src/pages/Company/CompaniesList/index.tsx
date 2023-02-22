import { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Row, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useMessage } from "../../../contexts/message";
import { Company, getCompanies } from "../../../requests/Company";
import { routePaths } from "../../../routes";
import "./index.css";

const columns: ColumnsType<Company> = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
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
        <Button icon={<DeleteFilled />} type="link" danger />
      </Space>
    ),
  },
];

export const CompaniesList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { message } = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
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

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>Empresas</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Link to={routePaths.company.creation}>
            <Button type="primary" icon={<PlusOutlined />}>
              Criar empresa
            </Button>
          </Link>
        </Col>
      </Row>
      <Table
        dataSource={companies}
        columns={columns}
        className="companies-table"
        rowKey="id"
        loading={loading}
      />
    </>
  );
};
