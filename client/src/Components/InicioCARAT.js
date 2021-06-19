import React from "react";
import { Doughnut } from "react-chartjs-2";

const InicioCARAT = (props) => {
  const carat = props;
  const caratInfo = carat.caratInfo;
  let values = [];
  let colors = [];

  let sum = 0;
  let tot = 0;
  let average;
  const constructInfo = () => {
    for (let i = 0; i < caratInfo.length; i++) {
      if (caratInfo[i].all.valueQuantity !== undefined) {
        sum += caratInfo[i].all.valueQuantity.value;
        tot = tot + 1;
      }
    }
    average = parseInt(sum / tot);
    values.push(average);
    values.push(30 - average);

    average >= 24 ? colors.push("#00ad50") : colors.push("#bf0000");
    colors.push("white");
  };
  constructInfo();
  const data = {
    datasets: [
      {
        label: "CARAT total",
        data: values,
        backgroundColor: colors,
        borderColor: "#e0e0e0",
      },
    ],
  };

  return (
    <div style={{ height: "90%" }}>
      <div className="inicioInfoCarat">{average}</div>
      <Doughnut
        data={data}
        height={80}
        width={80}
        options={{
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default InicioCARAT;
