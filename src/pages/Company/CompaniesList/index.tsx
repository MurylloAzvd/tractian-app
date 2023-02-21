import { Breadcrumb, Button, Col, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import "./index.css";

interface DataType {
  id: number;
  name: string;
}

const dataSource: DataType[] = [
  {
    id: 1,
    name: "The Test Company Mike",
  },
  {
    id: 2,
    name: "The Test Company John",
  },
  {
    id: 3,
    name: "The Test Company Mike",
  },
  {
    id: 4,
    name: "The Test Company John",
  },
];

const columns: ColumnsType<DataType> = [
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
  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>Empresas</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Criar empresa
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="companies-table"
        rowKey="id"
      />
    </>
  );
};
