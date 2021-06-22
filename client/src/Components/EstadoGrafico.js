import React from "react";
import { Chart, Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin); // REGISTER PLUGIN
function FDEstado(props) {
  const estado = props;
  const estadoInfo = estado.data;

  let values = [];
  let dates = [];

  for (let i = 0; i < estadoInfo.length; i++) {
    let answerDate = estadoInfo[i].all.authored.substring(0, 10);
    let arrayAnswer = estadoInfo[i].all.item;
    for (let i = 0; i < arrayAnswer.length; i++) {
      switch (arrayAnswer[i].linkId) {
        case "Q801_1.1":
          dates.unshift(answerDate);
          values.unshift(arrayAnswer[i].answer[0].valueDecimal);
          break;
        default:
          continue;
      }
    }
  }

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 10, 0, 350);
    gradientStroke.addColorStop(0.2, "#34ae16"); //verde
    gradientStroke.addColorStop(0.5, "#fffd1e"); //amarelo
    gradientStroke.addColorStop(0.8, "#ff0000"); //vermelho

    return {
      backgroundColor: gradientStroke,
      labels: dates,
      datasets: [
        {
          borderColor: gradientStroke,
          fill: gradientStroke,
          tension: 0.3,
          borderWidth: 4,
          data: values,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          beginAtZero: true,
          ticks: {
            max: 100,
            stepSize: 10,
          },
        },
      ],
    },
    plugins: {
      zoom: {
        limits: {
          y: {
            min: 0,
            max: 100,
            minRange: 10,
          },
          x: {
            min: 0,
            max: 100,
            minRange: 6,
          },
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.2,
          threshold: 5,
        },
        zoom: {
          enabled: true,
          wheel: {
            enabled: true,
          },
          drag: false,
          mode: "x",
          speed: 0.1,
          threshold: 2,
        },
      },
    },
  };

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
      <Line data={data} type="line" options={options} width={95} height={60} />
    </div>
  );
}

export default FDEstado;
