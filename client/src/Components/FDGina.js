import React from "react";

const FDGina = () => {
  /*

<div className="legendaGina">
          


  */
  return (
    <div className="ginaPanel">
      <div className="ginaLeft">
        <div className="graficoGina"> Reservado para o gráfico</div>
      </div>
      <div className="ginaRight">
        <div className="legendaGina">
          <div className="legendaGina2">
            <div
              className="circleLegendaGina"
              style={{ backgroundColor: "#b1e0a3" }}
            ></div>
            <div> Boa Adesão (≥ 80%)</div>
          </div>

          <div className="legendaGina2">
            <div
              className="circleLegendaGina"
              style={{ backgroundColor: "#fedf69" }}
            ></div>
            <div> Razoável Adesão (51 - 79%)</div>
          </div>

          <div className="legendaGina2">
            <div className="circleLegendaGina"></div>
            <div> Má Adesão (≤ 50%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDGina;
