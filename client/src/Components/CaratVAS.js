import React from "react";
import { Line, Chart } from "react-chartjs-2";

const CaratVAS = (props) => {
  const carat = props;
  const caratInfo = carat.caratInfo;

  let dates;
  let values;
  let goodValue;
  let maxValue;
  let minValue;

  const constructInfo = (caratInfo) => {
    dates = [];
    values = [];
    goodValue = [];
    maxValue = [];
    minValue = [];

    for (let i = 0; i < caratInfo.length; i++) {
      if (caratInfo[i].all.valueQuantity !== undefined) {
        dates.unshift(caratInfo[i].all.effectiveDateTime.substring(0, 10));
        values.unshift(caratInfo[i].all.component[0].valueInteger);
        goodValue.push(8);
        maxValue.push(12);
        minValue.push(0);
      }
    }
  };
  Chart.defaults.font.size = 12;

  const data = (canvas) => {
    constructInfo(caratInfo);

    const ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradientFill.addColorStop(0, "#34ae16"); //verde
    gradientFill.addColorStop(0.32, "#34ae16");
    gradientFill.addColorStop(0.4, "#fe0503"); //vermelho
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
          label: "CARAT VAS",
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
        {
          type: "line",
          label: "",
          borderColor: "#ffffff",
          backgroundColor: "white",
          pointRadius: 0,
          fill: false,
          data: minValue,
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
      <h3>Carat VAI</h3>
      <Line data={data} width={95} height={40} options={options} />
    </div>
  );
};

export default CaratVAS;
