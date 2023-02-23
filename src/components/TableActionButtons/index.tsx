import { Button, Popconfirm, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EditFilled, DeleteFilled, SearchOutlined } from "@ant-design/icons";

interface TableActionButtonsProps {
  detailRoutePath?: string;
  updateRoutePath?: string;
  deleteButton?: DeleteButtonProps;
}

interface DeleteButtonProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

export const TableActionButtons = ({
  detailRoutePath,
  updateRoutePath,
  deleteButton,
}: TableActionButtonsProps) => {
  return (
    <Space>
      {detailRoutePath && (
        <Tooltip title="Detalhes">
          <Link to={detailRoutePath}>
            <Button icon={<SearchOutlined />} type="link" />
          </Link>
        </Tooltip>
      )}
      {updateRoutePath && (
        <Tooltip title="Editar">
          <Link to={updateRoutePath}>
            <Button icon={<EditFilled />} type="link" />
          </Link>
        </Tooltip>
      )}
      {deleteButton && (
        <Popconfirm
          title={deleteButton.title}
          description={deleteButton.description}
          onConfirm={deleteButton.onConfirm}
          okText="Sim"
          cancelText="Não"
          placement="topRight"
        >
          <Button icon={<DeleteFilled />} type="link" danger />
        </Popconfirm>
      )}
    </Space>
  );
};
