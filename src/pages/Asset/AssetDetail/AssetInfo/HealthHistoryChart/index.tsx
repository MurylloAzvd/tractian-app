import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  Asset,
  AssetStatus,
  HealthHistoryRecord,
} from "../../../../../requests/Asset";

interface HealthHistoryChartProps {
  asset: Asset;
}

const generateHealthHistoryRecordData = (
  record: HealthHistoryRecord
): [number, number] => {
  const date = new Date(record.timestamp);

  const dateUTC = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  const statusNumber = {
    [AssetStatus.inDowntime]: 0.5,
    [AssetStatus.plannedStop]: 1.5,
    [AssetStatus.inOperation]: 2.5,
    [AssetStatus.unplannedStop]: 3.5,
    [AssetStatus.inAlert]: 4.5,
  };

  return [dateUTC, statusNumber[record.status]];
};

export const HealthHistoryChart = ({ asset }: HealthHistoryChartProps) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "spline",
          scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1,
          },
        },
        title: {
          text: "Histórico de saúde do ativo",
          align: "left",
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            month: "%e. %b",
            year: "%b",
          },
        },
        yAxis: {
          title: null,
          minorGridLineWidth: 0,
          gridLineWidth: 0,
          alternateGridColor: null,
          plotBands: [
            {
              from: 0,
              to: 1,
              color: "rgba(53, 49, 42, 0.2)",
              label: {
                text: "Em Parada Planejada",
                style: {
                  color: "rgba(53, 49, 42)",
                },
              },
            },
            {
              from: 1,
              to: 2,
              color: "rgba(68, 170, 213, 0.2)",
              label: {
                text: "Em Parada Planejada",
                style: {
                  color: "rgba(68, 170, 213)",
                },
              },
            },
            {
              from: 2,
              to: 3,
              color: "rgba(54, 202, 31, 0.2)",
              label: {
                text: "Em operação",
                style: {
                  color: "rgba(54, 202, 31)",
                },
              },
            },
            {
              from: 3,
              to: 4,
              color: "rgba(182, 194, 14, 0.2)",
              label: {
                text: "Em Parada Não Planejada",
                style: {
                  color: "rgba(182, 194, 14)",
                },
              },
            },
            {
              from: 4,
              to: 5,
              color: "rgba(203, 35, 16, 0.2)",
              label: {
                text: "Em Alerta",
                style: {
                  color: "rgba(203, 35, 16)",
                },
              },
            },
          ],
        },
        series: [
          {
            name: asset.name,
            data: asset.healthHistory.map((record) =>
              generateHealthHistoryRecordData(record)
            ),
          },
        ],
        navigation: {
          menuItemStyle: {
            fontSize: "10px",
          },
        },
      }}
    />
  );
};
