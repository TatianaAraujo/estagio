import React from "react";
import { Doughnut } from "react-chartjs-2";

const InicioCARAT = () => {
  let values = [80, 20];
  const data = {
    labels: ["Green", "White"],
    datasets: [
      {
        label: "My First Dataset",
        data: values,
        backgroundColor: ["#00ad50", "#ffffff"],
        borderColor: "#e0e0e0",
      },
    ],
  };

  
  return (
    <Doughnut
      style={{ border: "10px solid yellow" }}
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
