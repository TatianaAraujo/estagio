import React from "react";
import { Line, Chart } from "react-chartjs-2";
import moment from "moment";

const startDate = new Date(2021, 5, 1);
const labels = [""];
for (let i = 1; i < 4; i++) {
  let t = i * i - 1;
  const date = moment(startDate).add(t, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}
Chart.defaults.font.size = 12;

const data = () => {
  return {
    labels,
    datasets: [
      {
        label: "Brisovent Diskus 250",
        showLine: false,
        fill: false,
        borderWidth: 15,
        borderColor: "#ff0303",
        tension: 0,
        backgroundColor: "#7d0101",
        data: ["null", 1, 3],
      },
      {
        type: "line",
        label: " Flixitoide Diskus 500",
        showLine: false,
        fill: false,
        borderWidth: 15,
        borderColor: "green",
        tension: 0,
        backgroundColor: "#253e2f",
        data: ["null", "null", "null", 1],
      },
      {
        type: "line",
        label: "",
        borderColor: "#ffffff",
        backgroundColor: "white",
        pointRadius: 0,
        fill: false,
        data: ["", 0, 0, 0],
        showLine: false,
      },
    ],
  };
};

function MedicacaoGrafico(props) {
  /*const adesaoInfo = props;
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
  }*/

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
      <Line
        data={data}
        width={95}
        height={50}
        //options={}
      />
    </div>
  );
}
export default MedicacaoGrafico;
