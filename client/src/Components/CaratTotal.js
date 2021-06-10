import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const startDate = new Date(2020, 0, 1);
const labels = [];
for (let i = 0; i < 7; i++) {
  const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 100, 0, 300);
  gradientStroke.addColorStop(0, "#34ae16"); //verde
  gradientStroke.addColorStop(0.2, "#fffd1e"); //amarelo
  gradientStroke.addColorStop(0.8, "#ff0000"); //vermelho

  return {
    backgroundColor: gradientStroke,
    labels,
    datasets: [
      {
        backgroundColor: gradientStroke,
        fill: true,
        label: "carat",
        borderWidth: 4,
        tension: 0.1,
        pointRadius: 0,
        data: [0, 5, 10, 5, 20, 30, 15, 10],
        //data: [0, 5, 10, 15, 20, 25, 30],
      },
      {
        type: "line",
        label: "Limite da Normalidade >= 24",
        borderColor: "#34ae16",
        pointRadius: 0,
        fill: false,
        data: [24, 24, 24, 24, 24, 24, 24],
      },
    ],
  };
};

export default function CaratTotal() {
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
      <h3>Carat Total</h3>
      <Line
        data={data}
        width={95}
        height={40}
        options={{
          legend: {
            display: true,
            position: "bottom",
            color: "#ff0000",
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 30,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
