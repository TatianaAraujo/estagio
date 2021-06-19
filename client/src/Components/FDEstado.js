import React from "react";
import calendar from "../img/calendar.png";
import EstadoGrafico from "./EstadoGrafico";

const FDEstado = () => {
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
          <EstadoGrafico />
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
export default FDEstado;
