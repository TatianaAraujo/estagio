import React, { useState } from "react";
import airdoc from "../img/airdoc.png";
import caratm from "../img/caratm.png";

const FDMedicacaoInicio = ({ medicationList }) => {
  const airdocIcone = <img width="60%" src={airdoc} alt="" />;
  const caratmIcone = <img width="90%" src={caratm} alt="" />;

  return medicationList.map(
    ({ medicationReference, timing, route, doseQuantity, font }, index) => {
      let periodUnit = timing.periodUnit;
      let modoDeToma;
      let dayOfWeekExist;

      timing.dayOfWeek ? (dayOfWeekExist = 1) : (dayOfWeekExist = 0);

      if (periodUnit === "d") {
        modoDeToma = timing.timeOfDay.length + " vezes por dia";
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
      //let fetchPromise;
      if (medicationReference !== undefined) {
        const id = medicationReference.reference.substring(11);

        /*fetchPromise = fetch(`/Medication/?id=${id}`, {
          accept: "application/json",
        });*/

        //console.log(medicationName);
      }

      return (
        <div className="tableMedication" key={index}>
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
              <div className="lineMedication2"> {modoDeToma} </div>
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
          <div className="lineMedication">
            {" "}
            {font === "CARATm" ? caratmIcone : airdocIcone}
          </div>
        </div>
      );
    }
  );
};

export default FDMedicacaoInicio;
