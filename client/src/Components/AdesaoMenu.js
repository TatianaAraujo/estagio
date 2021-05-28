import React from "react";
import { useHistory } from "react-router-dom";

const AdesaoMenu = () => {
  const history = useHistory();

  const buttonUp = (buttonId) => {
    let button = document.getElementById(buttonId);
    //button.style.backgroundColor = "white";
    button.style.border = "4px solid #175874";
  };

  const buttonDown = (buttonId) => {
    let button = document.getElementById(buttonId);
    //button.style.backgroundColor = "white";
    button.style.border = "1px solid #707070";
  };

  const clickTodaMedicacao = () => {
    buttonDown("terapiaNasal");
    buttonDown("corticoidesInalados");
    buttonUp("todaMedicacao");
    history.push("/FichaDoDoente/Monitorizacao/Adesao/TodaMedicacao");
  };

  const clickTerapiaNasal = () => {
    buttonDown("corticoidesInalados");
    buttonDown("todaMedicacao");
    buttonUp("terapiaNasal");
    history.push("/FichaDoDoente/Monitorizacao/Adesao/TerapiaNasal");
  };

  const clickCorticoidesInalados = () => {
    buttonDown("terapiaNasal");
    buttonDown("todaMedicacao");
    buttonUp("corticoidesInalados");
    history.push("/FichaDoDoente/Monitorizacao/Adesao/CorticoidesInalados");
  };
  return (
    <div className="menuAdesao">
      <div
        className="buttonBigAdesao"
        id="todaMedicacao"
        onClick={() => {
          clickTodaMedicacao();
        }}
      >
        Toda a Medicação
      </div>
      <div
        className="buttonBigAdesao"
        id="terapiaNasal"
        onClick={() => {
          clickTerapiaNasal();
        }}
      >
        Terapia Nasal
      </div>
      <div
        className="buttonBigAdesao"
        id="corticoidesInalados"
        onClick={() => {
          clickCorticoidesInalados();
        }}
      >
        Corticóides Inalados
      </div>
    </div>
  );
};
export default AdesaoMenu;
