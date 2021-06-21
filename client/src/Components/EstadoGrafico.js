import React from "react";
import { Chart, Line } from "react-chartjs-2";
//import Hammer from "react-hammerjs";
//import * as Zoom from "chartjs-plugin-zoom";
//import zoomPlugin from "chartjs-plugin-zoom";
//import "chartjs-plugin-zoom";

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
          plugins: {
            legend: false,

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
          },
        }}
      />
    </div>
  );
}

export default FDEstado;
