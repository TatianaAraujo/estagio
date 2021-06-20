import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import AdesaoMenu from "./AdesaoMenu";
import AdesaoCorticoides from "./AdesaoCorticoides";
import AdesaoMedicacao from "./AdesaoMedicacao";
import AdesaoTerapia from "./AdesaoTerapia";

import AdesaoMedicacaoCircular from "./AdesaoMedicacaoCircular";
import AdesaoCorticoidesCircular from "./AdesaoCorticoidesCircular";
import AdesaoTerapiaCircular from "./AdesaoTerapiaCircular";

import calendar from "../img/calendar.png";

const FDAdesao = (props) => {
  const adesao = props;
  const patientId = adesao.adesao;

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
    <div className="adesaoPanel">
      <div className="adesaoLeft">
        <AdesaoMenu />
        <div className="graficoAdesao">
          <Switch>
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/CorticoidesInalados"
              render={() => (
                <AdesaoCorticoides
                  medStatement={medicationStatementInfo}
                  medAdministration={medicationAdministration}
                />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/TerapiaNasal"
              render={() => (
                <AdesaoTerapia
                  medStatement={medicationStatementInfo}
                  medAdministration={medicationAdministration}
                />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/TodaMedicacao"
              render={() => (
                <AdesaoMedicacao
                  medStatement={medicationStatementInfo}
                  medAdministration={medicationAdministration}
                />
              )}
            />
          </Switch>
        </div>
        <div className="legendaAdesao">
          <div className="legendaAdesao2">
            <div
              className="squadLegendaAdesao"
              style={{ backgroundColor: "#34ae16" }}
            ></div>
            <div> Boa Adesão (≥ 80%)</div>
          </div>
          <div className="legendaAdesao2">
            <div
              className="squadLegendaAdesao"
              style={{ backgroundColor: "#fffd1e" }}
            ></div>
            <div> Razoável Adesão (51 - 79%)</div>
          </div>
          <div className="legendaAdesao2">
            <div className="squadLegendaAdesao"></div>
            <div> Má Adesão (≤ 50%)</div>
          </div>
        </div>
      </div>

      <div className="adesaoRight">
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
        <div className="adesaoDivGraficoRight">
          <div className="adesaoGraficoRight">
            <Switch>
              <Route
                path="/FichaDoDoente/Monitorizacao/Adesao/CorticoidesInalados"
                render={(props) => (
                  <AdesaoCorticoidesCircular {...props} inicio={patientId} />
                )}
              />
              <Route
                path="/FichaDoDoente/Monitorizacao/Adesao/TerapiaNasal"
                render={(props) => (
                  <AdesaoTerapiaCircular {...props} inicio={patientId} />
                )}
              />
              <Route
                path="/FichaDoDoente/Monitorizacao/Adesao/TodaMedicacao"
                render={(props) => (
                  <AdesaoMedicacaoCircular {...props} inicio={patientId} />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDAdesao;
