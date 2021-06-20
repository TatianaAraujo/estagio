import React from "react";
import { Doughnut } from "react-chartjs-2";

const AdesaoMedicacaoCircular = () => {
  const todaMedicacaoInfo = JSON.parse(localStorage.getItem("todaMedicacao"));
  let values = [];
  let colors = [];

  let sum = 0;
  for (let i = 0; i < todaMedicacaoInfo.length; i++) {
    sum += todaMedicacaoInfo[i];
  }
  const average = parseInt(sum / todaMedicacaoInfo.length);
  values.push(average);
  values.push(100 - average);

  if (average >= 80) colors.push("#34ae16");
  else if (average >= 51 && average <= 79) colors.push("#fffd1e");
  else colors.push("#ff0000");
  colors.push("white");

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
    <div style={{ width: "80%", height: "65%" }}>
      <h5>Adesão Média a Toda a Medicação </h5>
      <Doughnut
        data={data}
        width={20}
        height={25}
        options={{
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          maintainAspectRatio: false,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "45%",
          fontSize: "35px",
        }}
      >
        {average}%
      </div>
    </div>
  );
};
export default AdesaoMedicacaoCircular;
