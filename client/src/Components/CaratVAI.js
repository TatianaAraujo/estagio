import React from "react";
import { Line, Chart } from "react-chartjs-2";

const CaratVAI = (props) => {
  const carat = props;
  const caratInfo = carat.caratInfo;

  let dates;
  let values;
  let goodValue;
  let maxValue;

  const constructInfo = (caratInfo) => {
    dates = [];
    values = [];
    goodValue = [];
    maxValue = [];

    for (let i = 0; i < caratInfo.length; i++) {
      if (caratInfo[i].all.valueQuantity !== undefined) {
        dates.unshift(caratInfo[i].all.effectiveDateTime.substring(0, 10));
        values.unshift(caratInfo[i].all.component[1].valueInteger);
        goodValue.push(16);
        maxValue.push(18);
      }
    }
  };
  Chart.defaults.font.size = 12;

  const data = (canvas) => {
    constructInfo(caratInfo);

    const ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradientFill.addColorStop(0, "#34ae16"); //verde
    gradientFill.addColorStop(0.15, "#34ae16");
    gradientFill.addColorStop(0.25, "#fe0503"); //vermelho
    gradientFill.addColorStop(1, "#fe0503");

    return {
      backgroundColor: gradientFill,
      labels: dates,
      datasets: [
        {
          backgroundColor: gradientFill,
          fill: true,
          borderWidth: 4,
          tension: 0.1,
          pointRadius: 2,
          data: values,
          label: "CARAT VAI",
        },
        {
          type: "line",
          label: "Limite da Normalidade > 24",
          borderColor: "#34ae16",
          backgroundColor: "#34ae16",
          pointRadius: 0,
          fill: false,
          data: goodValue,
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
      <h3>Carat VAI</h3>
      <Line
        data={data}
        width={95}
        height={40}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              color: "#34ae16",
            },
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
                  max: 18,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default CaratVAI;
