import React from "react";
import { Doughnut } from "react-chartjs-2";

const InicioCARAT = () => {
  let values = [5, 25];
  const data = {
    labels: ["Red", "White"],
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: ["#bf0000", "#ffffff"],
        borderColor: "#e0e0e0",
      },
    ],
  };

  return (
    <Doughnut
      data={data}
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
  );
};
export default InicioCARAT;
