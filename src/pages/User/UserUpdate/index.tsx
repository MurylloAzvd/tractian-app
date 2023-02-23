import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMessage } from "../../../contexts/message";
import { routePaths } from "../../../routes";
import {
  getUser,
  updateUser,
  User,
  UserFormData,
} from "../../../requests/User";
import { UserForm } from "../../../components/Forms/UserForm";

export const UserUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const { message } = useMessage();
  const params = useParams();

  const userId = Number(params.id);

  const saveUser = async (data: UserFormData) => {
    try {
      setLoading(true);
      await updateUser(userId, data);
      message.success("Usuário salvo com sucesso");
      navigate(routePaths.user.list);
    } catch (error) {
      message.error("Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = useCallback(async () => {
    try {
      const data = await getUser(userId);
      setUser(data);
    } catch (error) {
      message.error("Erro ao carregar o usuário");
    } finally {
      setLoading(false);
    }
  }, [userId, message]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.user.list}>Usuários</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Editar</Breadcrumb.Item>
      </Breadcrumb>
      {user && (
        <UserForm loading={loading} saveUser={saveUser} initialValues={user} />
      )}
    </>
  );
};
