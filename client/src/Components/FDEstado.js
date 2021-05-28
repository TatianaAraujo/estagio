import React from "react";
import calendar from "../img/calendar.png";

const FDEstado = () => {
  return (
    <div className="estadoPanel">
      <div className="estadoLeft">
        <div className="graficoEstado"> Reservado para o gráfico</div>
      </div>
      <div className="estadoRight">
        <div className="buttonSchedule">
          Filtrar Data
          <img style={{ width: "20%" }} src={calendar} alt="" />
        </div>
      </div>
    </div>
  );
};
export default FDEstado;
