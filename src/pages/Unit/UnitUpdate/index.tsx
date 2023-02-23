import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { UnitForm } from "../../../components/Forms/UnitForm";
import { useMessage } from "../../../contexts/message";
import {
  getUnit,
  Unit,
  UnitFormData,
  updateUnit,
} from "../../../requests/Unit";
import { routePaths } from "../../../routes";

export const UnitUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit>();
  const navigate = useNavigate();
  const { message } = useMessage();
  const params = useParams();

  const unitId = Number(params.id);

  const saveUnit = async (data: UnitFormData) => {
    try {
      setLoading(true);
      await updateUnit(unitId, data);
      message.success("Unidade salva com sucesso");
      navigate(routePaths.unit.list);
    } catch (error) {
      message.error("Erro ao salvar unidade");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnit = useCallback(async () => {
    try {
      const data = await getUnit(unitId);
      setUnit(data);
    } catch (error) {
      message.error("Erro ao carregar a unidade");
    } finally {
      setLoading(false);
    }
  }, [unitId, message]);

  useEffect(() => {
    fetchUnit();
  }, [fetchUnit]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={routePaths.unit.list}>Unidades</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Editar</Breadcrumb.Item>
      </Breadcrumb>
      {unit && (
        <UnitForm loading={loading} saveUnit={saveUnit} initialValues={unit} />
      )}
    </>
  );
};
