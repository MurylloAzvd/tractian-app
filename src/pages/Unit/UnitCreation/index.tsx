import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "antd";
import { useMessage } from "../../../contexts/message";
import { createUnit, UnitFormData } from "../../../requests/Unit";
import { routePaths } from "../../../routes";
import { UnitForm } from "../../../components/Forms/UnitForm";

export const UnitCreation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = useMessage();

  const saveUnit = async (data: UnitFormData) => {
    try {
      setLoading(true);
      await createUnit(data);
      message.success("Unidade salva com sucesso");
      navigate(routePaths.unit.list);
    } catch (error) {
      message.error("Erro ao salvar unidade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.unit.list}>Unidades</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Criar</Breadcrumb.Item>
      </Breadcrumb>
      <UnitForm loading={loading} saveUnit={saveUnit} />
    </>
  );
};
