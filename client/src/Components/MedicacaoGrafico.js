import React from "react";
import { Line, Chart } from "react-chartjs-2";
import moment from "moment";

const startDate = new Date(2020, 0, 1);
const labels = [""];
for (let i = 1; i < 6; i++) {
  const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}
Chart.defaults.font.size = 12;

const data = (canvas) => {
  const ctx = canvas.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 150, 0, 490);
  gradientStroke.addColorStop(0, "#fe2f2e"); //vermelho
  gradientStroke.addColorStop(0.3, "#fedf69"); //amarelo
  gradientStroke.addColorStop(0.6, "#b1e0a3"); //verde

  return {
    backgroundColor: gradientStroke,
    labels,
    datasets: [
      {
        borderColor: gradientStroke,
        showLine: false,
        fill: false,
        borderWidth: 0,
        tension: 0,
        pointBackgroundColor: gradientStroke,
        pointRadius: "10",
        pointBorderWidth: "6",
        //data: [0, 1, 2, 3, 4],
        data: ["null", 1, 3, 2, 4, 0],
      },
    ],
  };
};

function MedicacaoGrafico(props) {
  const adesaoInfo = props;
  const medStatement = adesaoInfo.medStatement;
  const medAdministration = adesaoInfo.medAdministration;

  let values = [];
  let dates = [];

  console.log(medStatement);
  console.log(medAdministration);

  for (let i = 0; i < medAdministration.length; i++) {
    //console.log(medAdministration[i].all.effectiveDateTime.substring(0, 10));
    if (
      medAdministration[i].all.reasonCode !== undefined &&
      medAdministration[i].all.reasonCode[0].coding[0].display === "Emergency"
    ) {
      console.log(medAdministration[i].all.medicationReference.reference); //Nome do medicamento temporário
      console.log(medAdministration[i].all); //

      //const = getMedicationDose;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h3> Nº de tomas de Medicação SOS </h3>
      <Line
        data={data}
        width={95}
        height={80}
        options={{
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
                  max: 4,
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
}
export default MedicacaoGrafico;
