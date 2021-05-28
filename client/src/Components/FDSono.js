import React from "react";

const FDSono = () => {
  return (
    <div className="sonoPanel">
      <div className="sonoLeft">
        <div className="sonoData">
          <div>Últimas respostas a</div>
          <div className="sonoChooseData"></div>
        </div>

        <div className="sonoDormir">
          <div>Como dormiu a noite passada?</div>
          <div className="graficoComoDormiu"></div>
        </div>

        <div className="sonoAsma">
          <div>
            Os seus problemas de sono da noite passada foram relacionados com a
            sua asma?
          </div>
          <div className="graficoComoDormiu"></div>
        </div>
        <div className="sonoSonolento">
          <div>Esteve sonolento durante o dia?</div>
          <div className="graficoSonolento"></div>
        </div>
      </div>
      <div className="sonoRight">
        <div className="qualidadeSono">
          <p>Qualidade do Sono</p>
          <div className="graficoRight"></div>
        </div>
        <div className="sonolencia">
          <p>Sonolência</p>
          <div className="graficoRight"></div>
        </div>
      </div>
    </div>
  );
};
export default FDSono;
