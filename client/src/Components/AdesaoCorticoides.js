import React from "react";
import { Line } from "react-chartjs-2";

function AdesaoCorticoides(props) {
  const adesaoInfo = props;
  const medStatement = adesaoInfo.medStatement;
  const medAdministration = adesaoInfo.medAdministration;

  let dates = [];
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
    return medicationDay.getTime() === day.getTime();
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
    presentDay = presentDay.setDate(presentDay.getDate()); //TODO depois Pôrr aqui - 1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

    let i = dateFirstRegisteredMedication;
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
      if (
        medicationAdministrationDay !== 0 ||
        medicationStatementDayNumber !== 0
      ) {
        values.push(
          parseInt(
            (medicationAdministrationDay / medicationStatementDayNumber) * 100
          )
        );
      } else {
        values.push(0);
      }

      i.setDate(i.getDate() + 1); //////////////////////////Cuidado com mudança de mês e/ou ano
    }

    localStorage.setItem("medicacaoCorticoideInalado", JSON.stringify(values));
  };

  const dateFirstRegisteredMedication = getDateFirstRegisteredMedication();
  createDatesAndValues(dateFirstRegisteredMedication);

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 10, 0, 350);
    gradientStroke.addColorStop(0, "#34ae16"); //verde
    gradientStroke.addColorStop(0.4, "#fffd1e"); //amarelo
    gradientStroke.addColorStop(0.8, "#ff0000"); //vermelho

    return {
      backgroundColor: gradientStroke,
      labels: dates,
      datasets: [
        {
          borderColor: gradientStroke,
          fill: false,
          borderWidth: 4,
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
      <h3>Adesão Global à Terapia</h3>
      <Line
        data={data}
        width={95}
        height={40}
        options={{
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
export default AdesaoCorticoides;
