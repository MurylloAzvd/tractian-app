import { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import { useMessage } from "../../../contexts/message";
import { Company, getCompanies } from "../../../requests/Company";

interface CompanySelectProps {
  onChange: (value: number) => void;
  value: number;
}

export const CompanySelect = ({ onChange, value }: CompanySelectProps) => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { message } = useMessage();

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
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

  const options = companies.map((company) => ({
    value: company.id,
    label: company.name,
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
