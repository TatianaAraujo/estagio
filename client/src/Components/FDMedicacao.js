import React, { useEffect, useState } from "react";
import calendar from "../img/calendar.png";
import MedicacaoGrafico from "./MedicacaoGrafico";

const FDMedicacao = (props) => {
  const medicacao = props;
  const patientId = medicacao.medicacao;

  const [medicationStatementInfo, setMedicationStatement] = useState([]);
  const [medicationAdministration, setMedicationAdministration] = useState([]);

  useEffect(() => {
    fetch(`/MedicationStatement?status=active&subject=Patient/${patientId}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setMedicationStatement(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`/medicationAdministration?subject=Patient/${patientId}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setMedicationAdministration(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientId]);

  let filtrarUp = 0;
  const changeDataInformation = () => {
    const filtrarData = document.getElementById("filtrarData");
    const periodosSchedule = document.getElementById("periodosSchedule");

    if (filtrarUp === 0) {
      filtrarData.style.height = "45%";
      periodosSchedule.style.display = "flex";
      filtrarUp = 1;
    } else {
      filtrarData.style.height = "8%";
      periodosSchedule.style.display = "none";
      filtrarUp = 0;
    }
  };

  return (
    <div className="estadoPanel">
      <div className="estadoLeft">
        <div className="graficoEstado">
          <MedicacaoGrafico
            medStatement={medicationStatementInfo}
            medAdministration={medicationAdministration}
          />
        </div>
      </div>
      <div className="estadoRight">
        <div className="buttonSchedule" id="filtrarData">
          <div className="filtroDiv">
            <div>Filtrar Data</div>
            <img
              style={{ width: "20%", cursor: "pointer" }}
              src={calendar}
              alt=""
              onClick={() => {
                changeDataInformation();
              }}
            />
          </div>
          <div className="periodosSchedule" id="periodosSchedule">
            <div className="periodosSchedule2" id="semana">
              Última Semana
            </div>
            <div className="periodosSchedule2" id="mes">
              Último Mês
            </div>
            <div className="periodosSchedule2" id="3meses">
              Últimos 3 Meses
            </div>
            <div className="periodosSchedule2" id="ano">
              Último Ano
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDMedicacao;
