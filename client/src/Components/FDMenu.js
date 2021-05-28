import React from "react";
import { useHistory } from "react-router-dom";

const FDMenu = () => {
  const history = useHistory();

  const buttonBigUp = (id) => {
    const button = document.getElementById(id);
    button.style.backgroundColor = "#175874";
    button.style.color = "white";
  };

  const buttonBigDown = (id) => {
    const button = document.getElementById(id);
    button.style.backgroundColor = "white";
    button.style.color = "#707070";
  };

  const buttonLittleUp = (id) => {
    const button = document.getElementById(id);
    button.style.backgroundColor = "white";
    button.style.border = "3px solid #175874";
  };

  const buttonLittleDown = (id) => {
    const button = document.getElementById(id);
    button.style.backgroundColor = "transparent";
    button.style.border = "1px solid #707070";
  };

  const conjMonitorizacaoUp = () => {
    buttonBigUp("monitorizacao");

    const adesao = document.getElementById("adesao");
    const medicacao = document.getElementById("medicacao");
    const carat = document.getElementById("carat");
    const eventos = document.getElementById("eventos");
    const estado = document.getElementById("estado");
    const gina = document.getElementById("gina");
    const sono = document.getElementById("sono");

    adesao.style.color = "black";
    medicacao.style.color = "black";
    carat.style.color = "black";
    eventos.style.color = "black";
    estado.style.color = "black";
    gina.style.color = "black";
    sono.style.color = "black";
  };

  const conjMonitorizacaoDown = () => {
    buttonBigDown("monitorizacao");

    const adesao = document.getElementById("adesao");
    const medicacao = document.getElementById("medicacao");
    const carat = document.getElementById("carat");
    const eventos = document.getElementById("eventos");
    const estado = document.getElementById("estado");
    const gina = document.getElementById("gina");
    const sono = document.getElementById("sono");

    adesao.style.color = "#b7b7b7";
    medicacao.style.color = "#b7b7b7";
    carat.style.color = "#b7b7b7";
    eventos.style.color = "#b7b7b7";
    estado.style.color = "#b7b7b7";
    gina.style.color = "#b7b7b7";
    sono.style.color = "#b7b7b7";
  };

  const allDown = () => {
    buttonBigDown("inicio");
    buttonBigDown("monitorizacao");
    buttonBigDown("planos");
    buttonBigDown("sons");
    buttonBigDown("mcdt");
    conjMonitorizacaoDown();

    buttonLittleDown("adesao");
    buttonLittleDown("medicacao");
    buttonLittleDown("carat");
    buttonLittleDown("eventos");
    buttonLittleDown("estado");
    buttonLittleDown("gina");
    buttonLittleDown("sono");
  };

  function clickInicio() {
    allDown();
    buttonBigUp("inicio");
    history.push("/FichaDoDoente/");
  }

  function clickSons() {
    allDown();
    buttonBigUp("sons");
    history.push("/FichaDoDoente/SonsRespiratorios");
  }

  function clickPlanos() {
    allDown();
    buttonBigUp("planos");
    history.push("/FichaDoDoente/Planos");
  }

  function clickMcdt() {
    allDown();
    buttonBigUp("mcdt");
    history.push("/FichaDoDoente/MCDT");
  }

  function clickAdesao() {
    allDown();
    buttonLittleUp("adesao");
    conjMonitorizacaoUp();
    history.push("/FichaDoDoente/Monitorizacao/Adesao");
  }

  function clickMedicacao() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("medicacao");
    history.push("/FichaDoDoente/Monitorizacao/Medicacao");
  }

  function clickCarat() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("carat");
    history.push("/FichaDoDoente/Monitorizacao/CARAT");
  }

  function clickEventos() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("eventos");
    history.push("/FichaDoDoente/Monitorizacao/Eventos");
  }

  function clickEstado() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("estado");
    history.push("/FichaDoDoente/Monitorizacao/Estado");
  }

  function clickGina() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("gina");
    history.push("/FichaDoDoente/Monitorizacao/GINA");
  }

  function clickSono() {
    allDown();
    conjMonitorizacaoUp();
    buttonLittleUp("sono");
    history.push("/FichaDoDoente/Monitorizacao/Sono");
  }

  return (
    <div id="menu" className="menu">
      <div
        className="buttonBig"
        id="inicio"
        style={{
          backgroundColor: "#175874",
          color: "white",
        }}
        onClick={async () => {
          clickInicio();
        }}
      >
        Início
      </div>
      <button
        className="buttonBig"
        id="monitorizacao"
        onClick={() => clickAdesao()}
      >
        Monitorização
      </button>

      <div className="menu2">
        <div
          className="buttonLittle"
          id="adesao"
          onClick={() => {
            clickAdesao();
          }}
        >
          Adesão Terapêutica
        </div>
        <div
          className="buttonLittle"
          id="medicacao"
          onClick={() => {
            clickMedicacao();
          }}
        >
          Medicação S.O.S
        </div>
        <div
          className="buttonLittle"
          id="carat"
          onClick={() => {
            clickCarat();
          }}
        >
          CARAT
        </div>
        <div
          className="buttonLittle"
          id="eventos"
          onClick={() => {
            clickEventos();
          }}
        >
          Eventos
        </div>
        <div
          className="buttonLittle"
          id="estado"
          onClick={() => {
            clickEstado();
          }}
        >
          Estado de Saúde
        </div>
        <div
          className="buttonLittle"
          id="gina"
          onClick={() => {
            clickGina();
          }}
        >
          GINA
        </div>
        <div
          className="buttonLittle"
          id="sono"
          onClick={() => {
            clickSono();
          }}
        >
          Sono
        </div>
      </div>

      <button
        className="buttonBig"
        id="planos"
        onClick={() => {
          clickPlanos();
        }}
      >
        Planos Ativos
      </button>

      <button
        className="buttonBig"
        id="sons"
        onClick={() => {
          clickSons();
        }}
      >
        Sons Respiratórios
      </button>
      <button
        className="buttonBig"
        id="mcdt"
        onClick={() => {
          clickMcdt();
        }}
      >
        MCDT
      </button>
    </div>
  );
};
export default FDMenu;
