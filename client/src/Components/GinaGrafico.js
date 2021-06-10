import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const startDate = new Date(2020, 0, 1);
const labels = [""];
for (let i = 1; i < 6; i++) {
  const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 150, 0, 490);
  gradientStroke.addColorStop(0, "#fe2f2e"); //vermelho
  gradientStroke.addColorStop(0.3, "#fedf69"); //amarelo
  gradientStroke.addColorStop(0.6, "#b1e0a3"); //verde

  return {
    backgroundColor: gradientStroke,
    labels,
    datasets: [
      {
        borderColor: gradientStroke,
        showLine: false,
        fill: false,
        borderWidth: 0,
        tension: 0,
        pointBackgroundColor: gradientStroke,
        pointRadius: "10",
        pointBorderWidth: "6",
        //data: [0, 1, 2, 3, 4],
        data: [, 1, 3, 2, 4, 0],
      },
    ],
  };
};

export default function GinaGrafico() {
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
      <h2> GINA </h2>
      <Line
        data={data}
        width={95}
        height={60}
        options={{
          legend: {
            display: false,
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
                  max: 4,
                  min: 0,
                  stepSize: 1,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
