import React from "react";
import { Line } from "react-chartjs-2";

const FDAdesao = () => {
  const xlabels = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const ylabels = [
    60,
    "null",
    "null",
    80,
    70,
    "null",
    20,
    "null",
    "null",
    80,
    "null",
    19,
  ];

  const data = {
    labels: xlabels,
    datasets: [
      {
        label: "Adesão Global ao Tratamento",
        data: ylabels,
        fill: false,
        borderColor: "rgba(76, 120, 198)",
        tension: 0,
        pointBackgroundColor: "rgba(221, 82, 60)",
        spanGaps: true,
        pointRadius: "8",
        pointBorderColor: "#e76e54",
        pointBorderWidth: "6",
      },
    ],
  };
  return (
    <div
      style={{
        height: "740px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <h3>Adesão Global ao Tratamento</h3>

      <div style={{ width: "85%", height: "85%" }}>
        <Line
          data={data}
          width={100}
          height={45}
          options={{
            legend: {
              position: "bottom",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};
export default FDAdesao;
