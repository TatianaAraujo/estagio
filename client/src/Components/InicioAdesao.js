import React from "react";
import { Doughnut } from "react-chartjs-2";

const InicioAdesao = () => {
  let todaMedicacaoInfo = JSON.parse(localStorage.getItem("todaMedicacao"));
  let values = [];
  let colors = [];

  let sum = 0;
  let average = 0;
  if (todaMedicacaoInfo != null) {
    for (let i = 0; i < todaMedicacaoInfo.length; i++) {
      sum += todaMedicacaoInfo[i];
    }
    average = parseInt(sum / todaMedicacaoInfo.length);
    values.push(average);
    values.push(100 - average);

    if (average >= 80) colors.push("#34ae16");
    else if (average >= 51 && average <= 79) colors.push("#fffd1e");
    else colors.push("#ff0000");
    colors.push("white");
  }
  const data = {
    labels: colors,
    datasets: [
      {
        data: values,
        backgroundColor: ["#bf0000", "#ffffff"],
        borderColor: "#e0e0e0",
      },
    ],
  };

  return (
    <div style={{ height: "96%" }}>
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: false,
          },
          animation: false,
          tooltips: {
            enabled: false,
          },
          maintainAspectRatio: false,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "80%",
          left: "69%",
          fontSize: "35px",
        }}
      >
        {average}%
      </div>
    </div>
  );
};
export default InicioAdesao;
