import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import { createUser, UserFormData } from "../../../requests/User";
import { UserForm } from "../../../components/Forms/UserForm";

export const UserCreation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = useMessage();

  const saveUser = async (data: UserFormData) => {
    try {
      setLoading(true);
      await createUser(data);
      message.success("Usuário salvo com sucesso");
      navigate(routePaths.user.list);
    } catch (error) {
      message.error("Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.user.list}>Usuários</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Criar</Breadcrumb.Item>
      </Breadcrumb>
      <UserForm loading={loading} saveUser={saveUser} />
    </>
  );
};
