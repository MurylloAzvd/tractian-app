import { Breadcrumb, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./index.css";

interface ListPageHeaderProps {
  title: string;
  addButton: AddButtonProps;
}

interface AddButtonProps {
  label: string;
  routePath: string;
}

export const ListPageHeader = ({ title, addButton }: ListPageHeaderProps) => {
  return (
    <Row className="list-page-header" align="middle" justify="space-between">
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col>
        <Link to={addButton.routePath}>
          <Button type="primary" icon={<PlusOutlined />}>
            {addButton.label}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};
