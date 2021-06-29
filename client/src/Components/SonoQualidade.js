import React from "react";
import { Line, Chart } from "react-chartjs-2";

const SonoQualidade = (props) => {
  const dataProps = props;
  const sonoData = dataProps.data;

  const xlabels = [];
  const ylabels = [];

  let lastDay;
  let firstDay;
  if (sonoData.length > 0) {
    let l = sonoData.length;
    lastDay = sonoData[0].all.authored.substring(0, 10);
    firstDay = sonoData[l - 1].all.authored.substring(0, 10);
  }

  for (let i = 0; i < sonoData.length; i++) {
    xlabels.unshift(sonoData[i].all.authored.substring(0, 10));

    for (let j = 0; j < sonoData[i].all.item.length; j++) {
      if (sonoData[i].all.item[j].linkId === "Q801_3.1") {
        ylabels.unshift(sonoData[i].all.item[j].answer[0].valueDecimal);
      }
    }
  }

  const data = {
    labels: xlabels,
    datasets: [
      {
        label: "Adesão Global ao Tratamento",
        data: ylabels,
        fill: false,
        borderColor: "#707070",
        tension: 0,
        pointBackgroundColor: false,
        spanGaps: true,
        pointRadius: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
  };
  Chart.defaults.font.size = 0;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Line data={data} width={100} height={65} options={options} />
      <div
        className="sonoGraficoLegenda"
        style={{
          left: "47%",
          top: "55%",
        }}
      >
        {lastDay}
      </div>
      <div
        className="sonoGraficoLegenda"
        style={{
          left: "27%",
          top: "55%",
        }}
      >
        {firstDay}
      </div>
      <div
        className="sonoGraficoLegenda"
        style={{
          left: "22%",
          top: "27%",
        }}
      >
        <div>Dormi</div>
        <div>muito bem</div>
      </div>
      <div
        className="sonoGraficoLegenda"
        style={{
          left: "22%",
          top: "50%",
        }}
      >
        <div>Dormi</div>
        <div>muito mal</div>
      </div>
    </div>
  );
};
export default SonoQualidade;
