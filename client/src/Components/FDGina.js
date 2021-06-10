import React from "react";
import GinaGrafico from "./GinaGrafico";

const FDGina = (props) => {
  const gina = props;
  const patientId = gina.gina;
  return (
    <div className="ginaPanel">
      <div className="ginaLeft">
        <div className="graficoGina">
          <GinaGrafico />
        </div>
      </div>
      <div className="ginaRight">
        <div className="legendaGina">
          <div className="legendaGina2">
            <div
              className="circleLegendaGina"
              style={{ backgroundColor: "#b1e0a3" }}
            ></div>
            <div> Controlado </div>
          </div>

          <div className="legendaGina2">
            <div
              className="circleLegendaGina"
              style={{ backgroundColor: "#fedf69" }}
            ></div>
            <div> Parcialmente Controlado</div>
          </div>

          <div className="legendaGina2">
            <div className="circleLegendaGina"></div>
            <div> Não Controlado </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDGina;
