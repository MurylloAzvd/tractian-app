import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Asset } from "../../../requests/Asset";

interface HealthScoreChartProps {
  assets: Asset[];
}

export const HealthScoreChart = ({ assets }: HealthScoreChartProps) => {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "column",
        },
        title: {
          align: "left",
          text: "Nível de saúde dos ativos",
        },
        accessibility: {
          announceNewData: {
            enabled: true,
          },
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            text: "Nível de saúde",
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y:.1f}%",
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
        },

        series: [
          {
            name: "Ativos",
            colorByPoint: true,
            data: assets.map((asset) => ({
              name: asset.name,
              y: asset.healthscore,
              drilldown: asset.name,
            })),
          },
        ],
        drilldown: {
          breadcrumbs: {
            position: {
              align: "right",
            },
          },
        },
      }}
    />
  );
};
