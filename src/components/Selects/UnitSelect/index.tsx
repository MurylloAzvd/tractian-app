import { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import { useMessage } from "../../../contexts/message";
import { getUnits, Unit } from "../../../requests/Unit";

interface UnitSelectProps {
  onChange: (value: number) => void;
  value: number;
}

export const UnitSelect = ({ onChange, value }: UnitSelectProps) => {
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<Unit[]>([]);
  const { message } = useMessage();

  const fetchUnits = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUnits();
      setUnits(data);
    } catch (error) {
      message.error("Erro ao carregar a lista de unidades");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const options = units.map((unit) => ({
    value: unit.id,
    label: unit.name,
  }));

  return (
    <Select
      value={loading ? undefined : value}
      options={options}
      onChange={onChange}
      loading={loading}
    />
  );
};
