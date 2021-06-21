import React, { useEffect, useState } from "react";

import InicioCARAT from "./InicioCARAT";
import InicioAdesao from "./InicioAdesao";
import FDMedicacaoInicio from "../Components/FDMedicacaoInicio";

import seta from "../img/botao-play-ponta-de-seta.png";
import informationButton from "../img/botao-de-informacao.png";
import inspirer from "../img/inspirermundi.png";
import airdoc from "../img/airdoc.png";
import caratm from "../img/caratm.png";
import { useHistory } from "react-router-dom";

const FDInicio = (props) => {
  const inicio = props;
  const patientId = inicio.inicio;
  const [medicationList, setMedicationList] = useState([]);

  const history = useHistory();

  //Agudizações
  const [eventosInfo, setEventosInfo] = useState([]);

  //Notas Gerais
  const [habitos, setHabitos] = useState([]);
  const [gravidez, setGravidez] = useState([]);
  const [caratInfo, setCaratInfo] = useState([]);
  const [lastCarat, setLastCarat] = useState([]);

  useEffect(async () => {
    const fetchCarat = async (patientId) => {
      const res = await fetch(`/Observation?id=${patientId}&code=2_901_0`, {
        accept: "application/json",
      });
      const data = await res.json();
      if (data[0] != undefined) {
        setLastCarat(data[0].all.effectiveDateTime.substring(0, 10));
        setCaratInfo(data);
      }
    };
    await fetchCarat(patientId);

    const fetchMedication = async (patientId) => {
      const res = await fetch(
        `/MedicationStatement?status=active&subject=Patient/${patientId}`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setMedicationList(data);
    };
    await fetchMedication(patientId);

    const getQuestionnaireResponse = async (code) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=${code}`,
        {
          accept: "application/json",
        }
      );
      const d = await res.json();
      return d;
    };

    const gethabitosInfo = async () => {
      let qr = await getQuestionnaireResponse("Q510PTpt_1.0");
      if (qr[0] != undefined) {
        let qrAnswer = qr[0].all[0];
        qrAnswer.answer[0].valueCoding.code === "A.1"
          ? setHabitos("Fumador/a")
          : setHabitos("Não Fumador/a");
      }
    };
    gethabitosInfo();

    const getOutrosInfo = async () => {
      let qr = await getQuestionnaireResponse("Q502PTpt_1.0");
      if (qr[0] !== undefined) {
        qr[0].all[0].answer[0].valueCoding.code === "A.1"
          ? setGravidez(
              "Gravidez, " + qr[0].all[1].answer[0].valueInteger + " semanas"
            )
          : setGravidez("");
      }
    };
    getOutrosInfo();

    const fetchEventos = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponseAll?id=${patientId}&code=Q301PTpt_1.0`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setEventosInfo(data);
    };
    await fetchEventos(patientId);
  }, []);

  const getArrayDates = () => {
    let dates = [];

    for (let i = 0; i < eventosInfo.length; i++) {
      const answers = eventosInfo[i].all.item;
      for (let j = 0; j < answers.length; j++) {
        if (
          answers[j].linkId === "Q301_1.1" &&
          answers[j].answer[0].valueCoding.code === "A.2"
        )
          break;

        if (answers[j].linkId === "Q301_1.2")
          dates.unshift(answers[j].answer[0].valueDate);
      }
    }
    return dates;
  };

  let week = 0;
  let month = 0;
  let year = 0;
  const calculateAgudizationsNr = () => {
    let arrayDates = getArrayDates();
    let currentDate = new Date();

    for (let i = 0; i < arrayDates.length; i++) {
      let arrayDate = new Date(
        arrayDates[i].substring(0, 4),
        arrayDates[i].substring(6, 7) - 1,
        arrayDates[i].substring(8, 10)
      );

      const diffTime = Math.abs(currentDate - arrayDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

      if (diffDays <= 7) week++;
      if (diffDays <= 30) month++;
      if (diffDays <= 360) year++;
    }
    if (week > 0) {
      let week = document.getElementById("week");
      week.style.backgroundColor = "#bf0000";
      week.style.color = "white";
    }
    if (month > 0) {
      let month = document.getElementById("month");
      month.style.backgroundColor = "#bf0000";
      month.style.color = "white";
    }
    if (year > 0) {
      let year = document.getElementById("year");
      year.style.backgroundColor = "#bf0000";
      year.style.color = "white";
    }
  };
  calculateAgudizationsNr();

  return (
    <div id="specific" style={{ display: "flex", flexDirection: "row" }}>
      <div className="central" id="central">
        <div className="notasGerais">
          <div className="indicatores">Notas Gerais</div>
          <div className="notasGeraisText">
            <img style={{ marginRight: "3%" }} width={"2%"} src={seta} alt="" />
            {gravidez}
          </div>
          <div className="notasGeraisText">
            <img style={{ marginRight: "3%" }} width={"2%"} src={seta} alt="" />
            {habitos}
          </div>
        </div>
        <div className="centroInferior">
          <div className="exacerbacoes">
            <div className="indicatores">
              Agudizações
              <img className="info" src={informationButton} alt="" />
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Última </div>
                <div className="periodo"> Semana </div>
              </div>
              <div className="square" id="week">
                {week}
              </div>
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Último </div>
                <div className="periodo"> Mês </div>
              </div>
              <div className="square" id="month">
                {month}
              </div>
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Último </div>
                <div className="periodo"> Ano </div>
              </div>
              <div className="square" id="year">
                {year}
              </div>
            </div>
          </div>

          <div className="carat">
            <div className="indicatores">
              <div>Carat Total</div>
              <div style={{ height: "90%" }}>
                <img className="inspirer" src={airdoc} alt="" />
              </div>
            </div>
            <div className="carat2">
              <div className="graficosInicio">
                {<InicioCARAT caratInfo={caratInfo} />}
              </div>

              <div className="caratInfo">
                <div className="ultima" style={{ fontSize: "20px" }}>
                  Último registo:
                </div>
                <div className="ultima" style={{ fontSize: "25px" }}>
                  {lastCarat}
                </div>
                <div
                  className="ultima"
                  style={{
                    fontSize: "18px",
                    color: "#4289cf",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    history.push("/FichaDoDoente/Monitorizacao/CARAT");
                  }}
                >
                  <u>Ver Histórico</u>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right" id="medicacao">
        <div className="medicacao">
          <div className="indicatores">Medicação Habitual</div>
          <div className="tableMedicationHeader">
            <div className="lineMedicationHeader"> Nome </div>
            <div className="lineMedicationHeader"> Modo de toma </div>
            <div className="lineMedicationHeader"> Frequência </div>
            <div className="lineMedicationHeader"> Hora </div>
            <div className="lineMedicationHeader"> Dose </div>
            <div className="lineMedicationHeader"> Fonte </div>
          </div>
          <div className="MedicationInfo">
            <FDMedicacaoInicio medicationList={medicationList} />
          </div>
        </div>

        <div className="adesaoGlobal">
          <div className="indicatores">
            <div>Adesão Medicação</div>
            <div style={{ height: "100%" }}>
              <img className="inspirer" src={inspirer} alt="" />
              <img className="inspirer" src={caratm} alt="" />
            </div>
          </div>

          <div className="adesaoGlobal2">
            <div className="graficosInicio">{<InicioAdesao />}</div>
            <div className="caratInfo">
              <div> Objetivo: </div>
              <div> {">"}= 80% </div>
              <div
                className="ultima"
                style={{
                  fontSize: "18px",
                  color: "#4289cf",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/FichaDoDoente/Monitorizacao/Adesao");
                }}
              >
                <u>Ver Histórico</u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDInicio;
