import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const startDate = new Date(2020, 0, 1);
const labels = [];
for (let i = 0; i < 11; i++) {
  const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 10, 0, 350);
  gradientStroke.addColorStop(0, "#34ae16"); //verde
  gradientStroke.addColorStop(0.4, "#fffd1e"); //amarelo
  gradientStroke.addColorStop(0.8, "#ff0000"); //vermelho

  return {
    backgroundColor: gradientStroke,
    labels,
    datasets: [
      {
        borderColor: gradientStroke,
        fill: false,
        borderWidth: 4,
        data: [0, 20, 70, 40, 100, 80, 70, 40, 30, 90, 10],
        //data: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      },
    ],
  };
};

export default function FDEstado() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <h3>Estado de saúde geral</h3>
      <Line
        data={data}
        width={95}
        height={60}
        options={{
          legend: {
            display: false,
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
  );
}
