import { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Button, Col, message, Row, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { Company, getCompanies } from "../../../requests/Company";
import { routerPaths } from "../../../routes";
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
        <Button icon={<EditFilled />} type="link" />
        <Button icon={<DeleteFilled />} type="link" danger />
      </Space>
    ),
  },
];

export const CompaniesList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      messageApi.error("Erro ao carregar a lista de empresas");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

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
          <Link to={routerPaths.company.creation}>
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
      {contextHolder}
    </>
  );
};
