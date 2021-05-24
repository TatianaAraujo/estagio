import React from "react";

const FDMedicacaoInicio = ({ medicationList }) => {
  /*const getMedicationName = (id) => {
    //console.log(id);
    id = id.substring(11);
    //console.log(id);
    fetch(`/Medication/?id=${id}`, {
      accept: "application/json",
    })
    .then(function (data) {
      return data.json();
    })
    
    .then(function (data) {
      //console.log(data);
      return data.name;
    })
    
    .catch(function (error) {
      return;
    });
  };*/

  return medicationList.map(
    ({ medicationReference, timing, route, doseQuantity }) => {
      let periodUnit;
      let frequency;
      let period;
      let dayOfWeekExist;

      timing.dayOfWeek ? (dayOfWeekExist = 1) : (dayOfWeekExist = 0);

      if (timing.frequency === 1) {
        frequency = "A cada";
      } else {
        frequency = timing.frequency;
      }

      if (timing.period === 1 || timing.period === 0) {
        period = "";
      } else {
        period = "a cada" + timing.frequency;
      }

      switch (timing.periodUnit) {
        case "d":
          periodUnit = "dia";
          if (timing.frequency > 1) {
            periodUnit = "dias";
          }
          break;
        case "h":
          periodUnit = "hora";
          if (timing.frequency > 1) {
            periodUnit = "horas";
          }
          break;
        case "wk":
          periodUnit = "semana";
          break;
        default:
          break;
      }

      let dayOfWeek = [7];
      for (let i = 0; i < 7; i++) {
        dayOfWeek[i] = "";
      }

      if (timing.dayOfWeek !== undefined) {
        for (let i = 0; i < 7; i++) {
          switch (timing.dayOfWeek[i]) {
            case "mon":
              dayOfWeek[0] = "Segunda";
              break;
            case "tue":
              dayOfWeek[1] = "Terça";
              break;
            case "wed":
              dayOfWeek[2] = "Quarta";
              break;
            case "thu":
              dayOfWeek[3] = "Quinta";
              break;
            case "fri":
              dayOfWeek[4] = "Sexta";
              break;
            case "sat":
              dayOfWeek[5] = "Sábado";
              break;
            case "sun":
              dayOfWeek[6] = "Domingo";
              break;
            default:
              break;
          }
        }
      }

      let timeOfDay = [10];

      for (let i = 0; i < 10; i++) {
        timeOfDay[i] = "";
      }

      if (timing.timeOfDay !== undefined) {
        for (let i = 0; i < timing.timeOfDay.length; i++) {
          timeOfDay[i] = timing.timeOfDay[i];
        }
      }
      let medicationName = "Sem nome";
      if (medicationReference !== undefined) {
        //medicationName = getMedicationName(medicationReference.reference);
      }
      // {/*frequency*/} {/*period*/} {/*periodUnit*/}
      return (
        <div className="tableMedication">
          <div className="lineMedication">{medicationName}</div>
          <div className="lineMedication"> {route}</div>

          <div className="tableMedication2">
            {dayOfWeekExist && dayOfWeek[0] !== "" ? (
              <div className="lineMedication2">Segunda</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[1] !== "" ? (
              <div className="lineMedication2">Terça</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[2] !== "" ? (
              <div className="lineMedication2">Quarta</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[3] !== "" ? (
              <div className="lineMedication2">Quinta</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[4] !== "" ? (
              <div className="lineMedication2">Sexta</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[5] !== "" ? (
              <div className="lineMedication2">Sábado</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist && dayOfWeek[6] !== "" ? (
              <div className="lineMedication2">Domingo</div>
            ) : (
              <div></div>
            )}
            {dayOfWeekExist === 0 ? (
              <div className="lineMedication2"></div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="tableMedication2">
            {timeOfDay[0] !== "" ? (
              <div className="lineMedication2">{timeOfDay[0]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[1] !== "" ? (
              <div className="lineMedication2">{timeOfDay[1]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[2] !== "" ? (
              <div className="lineMedication2">{timeOfDay[2]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[3] !== "" ? (
              <div className="lineMedication2">{timeOfDay[3]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[4] !== "" ? (
              <div className="lineMedication2">{timeOfDay[4]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[5] !== "" ? (
              <div className="lineMedication2">{timeOfDay[5]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[6] !== "" ? (
              <div className="lineMedication2">{timeOfDay[6]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[7] !== "" ? (
              <div className="lineMedication2">{timeOfDay[7]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[8] !== "" ? (
              <div className="lineMedication2">{timeOfDay[8]}</div>
            ) : (
              <div></div>
            )}
            {timeOfDay[9] !== "" ? (
              <div className="lineMedication2">{timeOfDay[9]}</div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="lineMedication">
            {doseQuantity.value} {doseQuantity.unit}
          </div>
        </div>
      );
    }
  );
};

export default FDMedicacaoInicio;
