import React from "react";
import { Line } from "react-chartjs-2";

const CaratTotal = (props) => {
  const carat = props;
  const caratInfo = carat.caratInfo;

  let dates;
  let values;
  let goodValue;

  const constructInfo = (caratInfo) => {
    dates = [];
    values = [];
    goodValue = [];
    for (let i = 0; i < caratInfo.length; i++) {
      if (caratInfo[i].all.valueQuantity !== undefined) {
        dates.unshift(caratInfo[i].all.effectiveDateTime.substring(0, 10));
        values.unshift(caratInfo[i].all.valueQuantity.value);
        goodValue.push(24);
      }
    }
  };

  const data = (canvas) => {
    constructInfo(caratInfo);

    const ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 55, 0, 200);
    gradientStroke.addColorStop(0.1, "#34ae16"); //verde
    gradientStroke.addColorStop(0.4, "#fffd1e"); //amarelo
    gradientStroke.addColorStop(1.0, "#ff0000"); //vermelho

    return {
      backgroundColor: gradientStroke,
      labels: dates,
      datasets: [
        {
          backgroundColor: gradientStroke,
          fill: true,
          borderWidth: 4,
          tension: 0.1,
          pointRadius: 2,
          data: values,
          label: "Carat",
        },
        {
          type: "line",
          label: "Limite da Normalidade > 24",
          borderColor: "#34ae16",
          pointRadius: 0,
          fill: false,
          data: goodValue,
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
      <h3>Carat Total</h3>
      <Line
        data={data}
        width={95}
        height={40}
        options={{
          maintainAspectRatio: false,
          responsive: true,
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
                  max: 35,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default CaratTotal;
