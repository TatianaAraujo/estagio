import React from "react";
import { Bar } from "react-chartjs-2";

const FDMedicacao = () => {
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
    2,
    null,
    null,
    1,
    null,
    null,
    3,
    null,
    null,
    3,
    null,
    1,
    2,
    null,
    null,
    1,
    null,
    null,
    3,
    null,
    null,
    3,
    null,
    1,
  ];
  const colors = [
    "#4472c4",
    null,
    null,
    "#ed7d31",
    null,
    null,
    "#4472c4",
    null,
    null,
    "#ed7d31",
    null,
    "#ed7d31",
    "#ed7d31",
    null,
    null,
    "#4472c4",
    null,
    null,
    "#ed7d31",
    null,
    null,
    "#4472c4",
    null,
    "#4472c4",
  ];

  const data = {
    labels: xlabels,
    datasets: [
      {
        label: ["Symbicort"],
        data: ylabels,
        backgroundColor: colors,
      },
      {
        label: "Cetirirzina",
        data: [],
        backgroundColor: "#ed7d31",
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
      <h3>Histórico de medicação</h3>
      <div style={{ width: "85%", height: "85%" }}>
        <Bar
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
                    max: 3,
                    stepSize: 1,
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
export default FDMedicacao;
