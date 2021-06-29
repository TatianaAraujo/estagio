import React, { useState, useEffect } from "react";
import calendar from "../img/calendar.png";
import EventosGrafico from "./EventosGrafico";
const FDEventos = (props) => {
  const eventos = props;
  const patientId = eventos.eventos;

  const [allAnswers, setAllAnswers] = useState([]);
  const [answersPeriod, setAnswersPeriod] = useState([]);

  useEffect(async () => {
    const fetchEventos = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponseAll?id=${patientId}&code=Q301PTpt_1.0`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setAllAnswers(data);
      setAnswersPeriod(data);
    };
    await fetchEventos(patientId);
  }, []);

  let filtrarUp = 0;
  const changeDataInformation = () => {
    const filtrarData = document.getElementById("filtrarData");
    const periodosSchedule = document.getElementById("periodosSchedule");

    if (filtrarUp === 0) {
      filtrarData.style.height = "45%";
      periodosSchedule.style.display = "flex";
      filtrarUp = 1;
    } else {
      filtrarData.style.height = "8%";
      periodosSchedule.style.display = "none";
      filtrarUp = 0;
    }
  };

  const filtrarAnswers = (nrDays) => {
    let currentDate = new Date();
    let newAnswers = [];

    if (nrDays === 0) {
      //desde sempre
      setAnswersPeriod(allAnswers);
      return;
    }

    for (let i = 0; i < allAnswers.length; i++) {
      let answerDate = allAnswers[i].all.authored.substring(0, 10);
      if (answerDate !== undefined) {
        let date = new Date(
          answerDate.substring(0, 4),
          answerDate.substring(6, 7) - 1,
          answerDate.substring(8, 10)
        );
        const diffTime = Math.abs(currentDate - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
        if (diffDays <= nrDays) {
          newAnswers.push(allAnswers[i]);
        }
      }
    }
    setAnswersPeriod(newAnswers);
  };

  return (
    <div className="eventosPanel">
      <div className="eventosLeft">
        <div className="graficoEventos">
          <h3> Agudizações </h3>
          <EventosGrafico eventosInfo={answersPeriod} />
        </div>
      </div>
      <div className="eventosRight">
        <div className="buttonSchedule" id="filtrarData">
          <div className="filtroDiv">
            <div>Filtrar Data</div>
            <img
              style={{ width: "20%", cursor: "pointer" }}
              src={calendar}
              alt=""
              onClick={() => {
                changeDataInformation();
              }}
            />
          </div>
          <div className="periodosSchedule" id="periodosSchedule">
            <div
              className="periodosSchedule2"
              id="semana"
              onClick={() => {
                changeDataInformation();
                filtrarAnswers(7);
              }}
            >
              Última Semana
            </div>
            <div
              className="periodosSchedule2"
              id="mes"
              onClick={() => {
                changeDataInformation();
                filtrarAnswers(30);
              }}
            >
              Último Mês
            </div>
            <div
              className="periodosSchedule2"
              id="3meses"
              onClick={() => {
                changeDataInformation();
                filtrarAnswers(90);
              }}
            >
              Últimos 3 Meses
            </div>
            <div
              className="periodosSchedule2"
              id="ano"
              onClick={() => {
                changeDataInformation();
                filtrarAnswers(365);
              }}
            >
              Último Ano
            </div>
            <div
              className="periodosSchedule2"
              id="sempre"
              onClick={() => {
                changeDataInformation();
                filtrarAnswers(0);
              }}
            >
              Desde Sempre
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDEventos;
