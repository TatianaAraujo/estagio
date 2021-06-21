import React from "react";
import { Line } from "react-chartjs-2";

const SonoQualidade = (props) => {
  const dataProps = props;
  const sonoData = dataProps.data;

  const xlabels = [];
  const ylabels = [];

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

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Line
        data={data}
        width={100}
        height={65}
        options={{
          plugins: {
            legend: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  //display:false
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
export default SonoQualidade;
