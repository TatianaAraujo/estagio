import React from "react";
import { Chart, Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin); // REGISTER PLUGIN

function FDEstado(props) {
  const estado = props;
  const estadoInfo = estado.data;

  let values = [];
  let dates = [];
  let maxValue = [];

  for (let i = 0; i < estadoInfo.length; i++) {
    let answerDate = estadoInfo[i].all.authored.substring(0, 10);
    let arrayAnswer = estadoInfo[i].all.item;
    for (let i = 0; i < arrayAnswer.length; i++) {
      switch (arrayAnswer[i].linkId) {
        case "Q801_1.1":
          dates.unshift(answerDate);
          let v = parseInt(arrayAnswer[i].answer[0].valueDecimal);
          values.unshift(v);
          maxValue.unshift(100);
          break;
        default:
          continue;
      }
    }
  }
  Chart.defaults.font.size = 12;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.height + 5);
    gradientFill.addColorStop(0, "#34ae16"); //verde
    gradientFill.addColorStop(0.21, "#34ae16");

    gradientFill.addColorStop(0.22, "#ffd65c"); //amarelo
    gradientFill.addColorStop(0.46, "#ffd65c");

    gradientFill.addColorStop(0.5, "#fe0503"); //vermelho
    gradientFill.addColorStop(1, "#fe0503");

    return {
      labels: dates,
      datasets: [
        {
          label: "Estado de saúde",
          backgroundColor: gradientFill,
          borderColor: gradientFill,
          fill: false,
          tension: 0.3,
          borderWidth: 4,
          data: values,
        },
        {
          type: "line",
          label: "",
          borderColor: "#ffffff",
          backgroundColor: "white",
          pointRadius: 0,
          fill: false,
          data: maxValue,
          showLine: false,
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
            minRange: 7,
          },
        },
        pan: {
          enabled: true,
          mode: "x",
          speed: 0.1,
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
