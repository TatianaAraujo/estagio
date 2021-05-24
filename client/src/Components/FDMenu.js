import React from "react";
import { useHistory } from "react-router-dom";

const FDMenu = () => {
  const history = useHistory();

  function inicioUp() {
    const inicio = document.getElementById("inicio");
    inicio.style.backgroundColor = "#175874";
    inicio.style.color = "white";
    inicio.style.fontFamily = "Serif";
  }

  function inicioDown() {
    const inicio = document.getElementById("inicio");
    inicio.style.backgroundColor = "white";
    inicio.style.color = "#707070";
    inicio.style.fontFamily = "Arial";
  }

  function graficosUp() {
    const graficos = document.getElementById("graficos");
    const adesao = document.getElementById("adesao");
    const medicacao = document.getElementById("medicacao");
    const carat = document.getElementById("carat");
    const eventos = document.getElementById("eventos");
    const coaching = document.getElementById("coaching");
    graficos.style.backgroundColor = "#175874";
    graficos.style.color = "white";
    graficos.style.fontFamily = "Serif";
    adesao.style.color = "#707070";
    medicacao.style.color = "#707070";
    carat.style.color = "#707070";
    eventos.style.color = "#707070";
    coaching.style.color = "#707070";
  }

  function graficosDown() {
    const graficos = document.getElementById("graficos");
    const adesao = document.getElementById("adesao");
    const medicacao = document.getElementById("medicacao");
    const carat = document.getElementById("carat");
    const eventos = document.getElementById("eventos");
    const coaching = document.getElementById("coaching");
    graficos.style.backgroundColor = "white";
    graficos.style.color = "#707070";
    graficos.style.fontFamily = "Arial";
    adesao.style.color = "#b7b7b7";
    medicacao.style.color = "#b7b7b7";
    carat.style.color = "#b7b7b7";
    eventos.style.color = "#b7b7b7";
    coaching.style.color = "#b7b7b7";
  }

  function sonsUp() {
    const sons = document.getElementById("sons");
    sons.style.backgroundColor = "#175874";
    sons.style.color = "white";
    sons.style.fontFamily = "Serif";
  }

  function sonsDown() {
    const sons = document.getElementById("sons");
    sons.style.backgroundColor = "white";
    sons.style.color = "#707070";
    sons.style.fontFamily = "Arial";
  }

  function questionariosUp() {
    const questionarios = document.getElementById("questionarios");
    questionarios.style.backgroundColor = "#175874";
    questionarios.style.color = "white";
    questionarios.style.fontFamily = "Serif";
  }

  function questionariosDown() {
    const questionarios = document.getElementById("questionarios");
    questionarios.style.backgroundColor = "white";
    questionarios.style.color = "#707070";
    questionarios.style.fontFamily = "Arial";
  }

  function adesaoUp() {}

  function adesaoDown() {}

  function medicacaoUp() {}

  function medicacaoDown() {}

  function caratUp() {}

  function caratDown() {}

  function eventosUp() {}

  function eventosDown() {}

  function coachingUp() {}

  function coachingDown() {}

  function clickInicio() {
    inicioUp();
    history.push("/FichaDoDoente/");
    graficosDown();
    sonsDown();
    adesaoDown();
    medicacaoDown();
    caratDown();
    eventosDown();
    coachingDown();
    questionariosDown();
  }

  function clickGraficos() {
    inicioDown();
    graficosUp();
    history.push("/FichaDoDoente/Graficos");
    sonsDown();
    questionariosDown();
  }

  function clickSons() {
    inicioDown();
    graficosDown();
    sonsUp();
    history.push("/FichaDoDoente/SonsRespiratorios");
    adesaoDown();
    medicacaoDown();
    caratDown();
    eventosDown();
    coachingDown();
    questionariosDown();
  }

  function clickAdesao() {
    clickGraficos();
    adesaoUp();
    history.push("/FichaDoDoente/Graficos/Adesao");
    medicacaoDown();
    caratDown();
    eventosDown();
    coachingDown();
  }

  function clickMedicacao() {
    clickGraficos();
    adesaoDown();
    medicacaoUp();
    history.push("/FichaDoDoente/Graficos/Medicacao");
    caratDown();
    eventosDown();
    coachingDown();
  }

  function clickCarat() {
    clickGraficos();
    adesaoDown();
    medicacaoDown();
    caratUp();
    history.push("/FichaDoDoente/Graficos/CARAT");
    eventosDown();
    coachingDown();
  }

  function clickEventos() {
    clickGraficos();
    adesaoDown();
    medicacaoDown();
    caratDown();
    eventosUp();
    history.push("/FichaDoDoente/Graficos/Eventos");
    coachingDown();
    questionariosDown();
  }

  function clickCoaching() {
    clickGraficos();
    adesaoDown();
    medicacaoDown();
    caratDown();
    eventosDown();
    coachingUp();
    history.push("/FichaDoDoente/Graficos/Coaching");
  }

  function clickQuestionarios() {
    inicioDown();
    history.push("/FichaDoDoente/");
    graficosDown();
    sonsDown();
    adesaoDown();
    medicacaoDown();
    caratDown();
    eventosDown();
    coachingDown();
    questionariosUp();
    history.push("/FichaDoDoente/Questionarios");
  }

  return (
    <div id="menu" className="menu">
      <div
        className="buttonBig"
        id="inicio"
        style={{
          backgroundColor: "#175874",
          color: "white",
          fontFamily: "Serif",
        }}
        onClick={async () => {
          clickInicio();
        }}
      >
        Início
      </div>
      <button
        className="buttonBig"
        id="graficos"
        onClick={() => clickGraficos()}
      >
        Gráficos
      </button>

      <div className="menu2">
        <div
          className="buttonLittle"
          id="adesao"
          onClick={() => {
            clickAdesao();
          }}
        >
          Adesão
        </div>
        <div
          className="buttonLittle"
          id="medicacao"
          onClick={() => {
            clickMedicacao();
          }}
        >
          Medicação
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
          id="coaching"
          onClick={() => {
            clickCoaching();
          }}
        >
          Coaching
        </div>
      </div>

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
        id="questionarios"
        onClick={() => {
          clickQuestionarios();
        }}
      >
        Questionários
      </button>
    </div>
  );
};
export default FDMenu;
