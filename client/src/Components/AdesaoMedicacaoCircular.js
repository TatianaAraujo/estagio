import React from "react";
import { Doughnut } from "react-chartjs-2";

const AdesaoMedicacaoCircular = (props) => {
  const adesao = props;
  const patientId = adesao.adesao;

  let values = [50, 100];
  const data = {
    labels: ["Red", "White"],
    datasets: [
      {
        data: values,
        backgroundColor: ["#bf0000", "#ffffff"],
        borderColor: "#e0e0e0",
      },
    ],
  };

  return (
    <div style={{ width: "80%", height: "65%" }}>
      <h5>Adesao Média a Toda a Medicação </h5>
      <Doughnut
        data={data}
        width={20}
        height={25}
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
export default AdesaoMedicacaoCircular;
