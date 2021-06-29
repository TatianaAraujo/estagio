import React from "react";
import { Line, Chart } from "react-chartjs-2";

function AdesaoCorticoides(props) {
  const adesaoInfo = props;
  const medStatement = adesaoInfo.medStatement;
  const medAdministration = adesaoInfo.medAdministration;
  const timing = adesaoInfo.timing;

  let dates = [];
  let maxValue = [];
  let values = [];

  let daysOfWeek = new Map();
  daysOfWeek.set(0, "sun");
  daysOfWeek.set(1, "mon");
  daysOfWeek.set(2, "tue");
  daysOfWeek.set(3, "wed");
  daysOfWeek.set(4, "thu");
  daysOfWeek.set(5, "fri");
  daysOfWeek.set(6, "sat");

  const getDateFirstRegisteredMedication = () => {
    let oldestDate = new Date();
    for (let i = 0; i < medStatement.length; i++) {
      let currentDate = new Date(
        medStatement[i].date.substring(0, 4),
        medStatement[i].date.substring(6, 7) - 1,
        medStatement[i].date.substring(8, 10)
      );
      if (currentDate <= oldestDate && medStatement[i].route === "Oral")
        oldestDate = currentDate;
    }
    return oldestDate;
  };
  const registed = (medicationDay, day) => {
    medicationDay = new Date(
      medicationDay.substring(0, 4),
      medicationDay.substring(6, 7) - 1,
      medicationDay.substring(8, 10)
    );
    return medicationDay < day;
  };

  /**
   * Verifica a medicação que devia ter sido tomada em determinado dia
   * @param {*} day
   * @returns medicationStatementId - Array de objetos com o id do medicationStatment + o nr de vezes que devia ter tomado a medicação naquele dia
   */
  const verifyMedicationStatement = (day) => {
    let medicationStatementDay = [];
    for (let i = 0; i < medStatement.length; i++) {
      if (registed(medStatement[i].date, day)) {
        if (medStatement[i].route === "Oral") {
          if (medStatement[i].timing.timeOfDay != undefined) {
            if (medStatement[i].timing.dayOfWeek != undefined) {
              //Medicação em alguns dias da semana
              for (
                let j = 0;
                j < medStatement[i].timing.dayOfWeek.length;
                j++
              ) {
                if (
                  medStatement[i].timing.dayOfWeek[j] ===
                  daysOfWeek.get(day.getDay())
                ) {
                  medicationStatementDay.push({
                    id: medStatement[i].medicationStatementId,
                    times: medStatement[i].timing.timeOfDay.length,
                  });
                }
              }
            } else {
              //Medicação diária
              medicationStatementDay.push({
                id: medStatement[i].medicationStatementId,
                times: medStatement[i].timing.timeOfDay.length,
              });
            }
          }
        }
      }
    }
    return medicationStatementDay;
  };
  const equalsDates = (medicationDay, day) => {
    medicationDay = new Date(
      medicationDay.substring(0, 4),
      medicationDay.substring(6, 7) - 1,
      medicationDay.substring(8, 10)
    );

    if (
      medicationDay.getDate() === day.getDate() &&
      medicationDay.getMonth() === day.getMonth() &&
      medicationDay.getFullYear() === day.getFullYear()
    )
      return true;
  };
  const verifyMedicationAdministration = (medicationStatementDay, day) => {
    let cont = 0;
    for (let i = 0; i < medAdministration.length; i++) {
      if (medAdministration[i].all.effectiveDateTime !== undefined) {
        if (equalsDates(medAdministration[i].all.effectiveDateTime, day)) {
          for (let j = 0; j < medicationStatementDay.length; j++) {
            if (
              medicationStatementDay[j].id ===
              medAdministration[
                i
              ].all.supportingInformation[0].reference.substring(20)
            ) {
              cont++;
            }
          }
        }
      }
    }
    return cont;
  };

  const verifyMedicationStatementNumber = (medicationStatementDay) => {
    let cont = 0;
    for (let j = 0; j < medicationStatementDay.length; j++) {
      cont += medicationStatementDay[j].times;
    }
    return cont;
  };

  const createDatesAndValues = (dateFirstRegisteredMedication) => {
    let presentDay = new Date();
    presentDay = presentDay.setDate(presentDay.getDate() - 1);

    let i = dateFirstRegisteredMedication;

    if (timing !== 0) {
      let newDate = new Date();
      newDate.setDate(newDate.getDate() - timing);
      i = newDate;
    }
    while (i < presentDay) {
      let medicationStatementDay = verifyMedicationStatement(i);

      let medicationStatementDayNumber = verifyMedicationStatementNumber(
        medicationStatementDay
      );

      let medicationAdministrationDay = verifyMedicationAdministration(
        medicationStatementDay,
        i
      );

      dates.push(
        i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate()
      );
      maxValue.push(100);

      let average = parseInt(
        (medicationAdministrationDay / medicationStatementDayNumber) * 100
      );
      medicationAdministrationDay > medicationStatementDayNumber
        ? (average = 100)
        : (average = average);

      if (
        medicationAdministrationDay !== 0 ||
        medicationStatementDayNumber !== 0
      ) {
        values.push(average);
      } else {
        values.push(0);
      }

      i.setDate(i.getDate() + 1); //////////////////////////Cuidado com mudança de mês e/ou ano
    }

    if (
      !localStorage.hasOwnProperty("medicacaoCorticoideInalado") &&
      medStatement !== []
    )
      localStorage.setItem(
        "medicacaoCorticoideInalado",
        JSON.stringify(values)
      );
  };

  const dateFirstRegisteredMedication = getDateFirstRegisteredMedication();
  createDatesAndValues(dateFirstRegisteredMedication);

  Chart.defaults.font.size = 12;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 0, 0, canvas.height + 5);
    gradientFill.addColorStop(0, "#34ae16"); //verde
    gradientFill.addColorStop(0.21, "#34ae16");

    gradientFill.addColorStop(0.22, "#ffd65c"); //amarelo
    gradientFill.addColorStop(0.46, "#ffd65c");

    gradientFill.addColorStop(0.5, "#fe0503"); //vermelho
    gradientFill.addColorStop(1, "#fe0503");

    return {
      labels: dates,
      datasets: [
        {
          label: "Adesão ao corticóide",
          backgroundColor: gradientFill,
          borderColor: gradientFill,
          fill: false,
          borderWidth: 4,
          data: values,
          tension: 0.3,
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
      <Line data={data} width={95} height={40} options={options} />
    </div>
  );
}
export default AdesaoCorticoides;
