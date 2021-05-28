import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import AdesaoMenu from "./AdesaoMenu";
import AdesaoCorticoides from "./AdesaoCorticoides";
import AdesaoMedicacao from "./AdesaoMedicacao";
import AdesaoTerapia from "./AdesaoTerapia";

import calendar from "../img/calendar.png";

const FDAdesao = (props) => {
  const adesao = props;
  const patientId = adesao.adesao;

  return (
    <div className="adesaoPanel">
      <div className="adesaoLeft">
        <AdesaoMenu />
        <div className="graficoAdesao">
          <Switch>
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/CorticoidesInalados"
              render={(props) => (
                <AdesaoCorticoides {...props} inicio={patientId} />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/TerapiaNasal"
              render={(props) => (
                <AdesaoTerapia {...props} inicio={patientId} />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/TodaMedicacao"
              render={(props) => (
                <AdesaoMedicacao {...props} inicio={patientId} />
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
        <div className="buttonSchedule">
          Filtrar Data
          <img style={{ width: "20%" }} src={calendar} alt="" />
        </div>
        <div className="adesaoDivGraficoRight">
          <div>Adesao Média a Toda a Medicação</div>
          <div className="adesaoGraficoRight"></div>
        </div>
      </div>
    </div>
  );
};
export default FDAdesao;
