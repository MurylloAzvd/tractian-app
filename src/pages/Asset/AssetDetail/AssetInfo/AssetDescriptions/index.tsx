import { Descriptions } from "antd";
import { AssetStatusTag } from "../../../../../components/AssetStatusTag";
import { Asset } from "../../../../../requests/Asset";

interface AssetDescriptionsProps {
  asset: Asset;
}

export const AssetDescriptions = ({
  asset: { name, healthscore, model, sensors, specifications, status, metrics },
}: AssetDescriptionsProps) => {
  return (
    <Descriptions title={name}>
      <Descriptions.Item label="Modelo">{model}</Descriptions.Item>
      <Descriptions.Item label="Status">
        <AssetStatusTag status={status} />
      </Descriptions.Item>
      <Descriptions.Item label="Nível de saúde">
        {healthscore}%
      </Descriptions.Item>
      <Descriptions.Item label="Sensores">
        {sensors.map((sensor) => (
          <>
            <span>{sensor}</span>
            <br />
          </>
        ))}
      </Descriptions.Item>
      <Descriptions.Item label="Especificações">
        {specifications.maxTemp && (
          <>
            Temperatura máxima: {specifications.maxTemp} °C
            <br />
          </>
        )}
        {specifications.power && (
          <>
            Potência: {specifications.power} kWh
            <br />
          </>
        )}
        {specifications.rpm && <>RPM: {specifications.rpm}</>}
      </Descriptions.Item>
      <Descriptions.Item label="Métricas">
        Total de coletas: {metrics.totalCollectsUptime}
        <br />
        Total de horas coletadas: {metrics.totalUptime.toFixed(2)} horas
        <br />
        Data da última coleta: {new Date(metrics.lastUptimeAt).toLocaleString()}
      </Descriptions.Item>
    </Descriptions>
  );
};
