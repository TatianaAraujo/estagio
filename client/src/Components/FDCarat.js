import React from "react";
import calendar from "../img/calendar.png";
import { Switch, Route } from "react-router-dom";

import CaratTotal from "./CaratTotal";
import CaratVAS from "./CaratVAS";
import CaratVAI from "./CaratVAI";
import CaratMenu from "./CaratMenu";

const FDCarat = (props) => {
  const carat = props;
  const patientId = carat.carat;

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
    <div className="caratPanel">
      <div className="adesaoLeft">
        <CaratMenu />
        <div className="graficoAdesao">
          <Switch>
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratTotal"
              render={(props) => <CaratTotal {...props} inicio={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratVAI"
              render={(props) => <CaratVAI {...props} inicio={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratVAS"
              render={(props) => <CaratVAS {...props} inicio={patientId} />}
            />
          </Switch>
        </div>
      </div>
      <div className="caratRight">
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
export default FDCarat;
