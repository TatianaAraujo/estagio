import React from "react";

import calendar from "../img/calendar.png";

const FDEventos = (props) => {
  const eventos = props;
  const patientId = eventos.eventos;
  return (
    <div className="eventosPanel">
      <div className="eventosLeft">
        <div className="graficoEventos"> Reservado para o gráfico</div>
      </div>
      <div className="eventosRight">
        <div className="buttonSchedule">
          Filtrar Data
          <img style={{ width: "20%" }} src={calendar} alt="" />
        </div>
        <div className="infoEventos">
          <div> Datas das exacerbações</div>
        </div>
      </div>
    </div>
  );
};
export default FDEventos;
