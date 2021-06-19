import React from "react";
import { Line } from "react-chartjs-2";

const GinaGrafico = (props) => {
  const gina = props;
  const ginaInfo = gina.ginaInfo;

  let dates;
  let values;
  let colors;
  const constructInfo = (ginaInfo) => {
    dates = [];
    values = [];
    colors = [];
    for (let i = 0; i < ginaInfo.length; i++) {
      dates.unshift(ginaInfo[i].all.authored.substring(0, 10));
      let answers = ginaInfo[i].all.item;

      let sumCurrent = 0;
      for (let j = 0; j < answers.length; j++) {
        if (answers[j].linkId === "Q911_1.1") {
          if (answers[j].answer[0].valueInteger > 2) sumCurrent++;
        } else if (answers[j].linkId === "Q911_1.2") {
          if (answers[j].answer[0].valueCoding.code === "A.1") sumCurrent++;
        } else if (answers[j].linkId === "Q911_1.3") {
          if (answers[j].answer[0].valueInteger > 2) sumCurrent++;
        } else if (answers[j].linkId === "Q911_1.4") {
          if (answers[j].answer[0].valueCoding.code === "A.1") sumCurrent++;
        }
      }
      values.unshift(sumCurrent);
      if (sumCurrent === 0) colors.unshift("#b1e0a3");
      else if (sumCurrent === 1 || sumCurrent === 2) colors.unshift("#fedf69");
      else if (sumCurrent === 3 || sumCurrent === 4) colors.unshift("#fe2f2e");
      sumCurrent = 0;
    }
    dates.unshift("");
    values.unshift(null);
    colors.unshift("");
  };

  const data = () => {
    constructInfo(ginaInfo);

    return {
      backgroundColor: colors,
      labels: dates,
      datasets: [
        {
          borderColor: colors,
          showLine: false,
          fill: false,
          borderWidth: 0,
          tension: 0,
          pointBackgroundColor: colors,
          pointRadius: 7,
          pointBorderWidth: 12,
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
                scaleLabel: {
                  display: true,
                  labelString: "Score GINA",
                },
                ticks: {
                  beginAtZero: true,
                  max: 5,
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
};
export default GinaGrafico;
