import React from "react";
import validado from "../img/Imagem1.png";
import naoValidado from "../img/Imagem2.png";

const FDCabecalho = (props) => {
  const { diagnosticos } = props;
  const diagnosticoValidado = <img width="34%" src={validado} alt="" />;
  const diagnosticoNaoValidado = <img width="40%" src={naoValidado} alt="" />;

  return (
    <div className="linhaDiagnosticos">
      {diagnosticos.map(({ text, validado }, index) => (
        <div className="diagnosticosItem" key={index}>
          {validado == 1 ? diagnosticoValidado : diagnosticoNaoValidado}
          <div className="diagnosticosText">
            <div style={{ fontSize: "22px" }}>{text}</div>
            <div>Desde os X</div>
            <div>anos</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FDCabecalho;
