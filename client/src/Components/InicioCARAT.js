import React from "react";
import { Doughnut } from "react-chartjs-2";

const InicioCARAT = (props) => {
  const carat = props;
  const caratInfo = carat.caratInfo;
  let values = [];
  let colors = [];
  let value = 0;

  const constructInfo = () => {
    if (caratInfo[0] !== undefined) {
      value = caratInfo[0].all.valueQuantity.value;
      values.push(value);
      values.push(30 - value);
      value >= 24 ? colors.push("#00ad50") : colors.push("#bf0000");
      colors.push("white");
    }
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
      <div className="inicioInfoCarat">{value}</div>
      <Doughnut
        data={data}
        height={80}
        width={80}
        options={{
          legend: {
            display: false,
          },
          animation: false,
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
