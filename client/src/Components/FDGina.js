import React, { useState, useEffect } from "react";
import calendar from "../img/calendar.png";
import GinaGrafico from "./GinaGrafico";

const FDGina = (props) => {
  const gina = props;
  const patientId = gina.gina;

  const [allAnswers, setAllAnswers] = useState([]);
  const [answersPeriod, setAnswersPeriod] = useState([]);

  useEffect(() => {
    fetch(`/QuestionnaireResponseAll?id=${patientId}&code=Q911PTpt_1.0`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllAnswers(data);
        setAnswersPeriod(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientId]);

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
    <div className="ginaPanel">
      <div className="ginaLeft">
        <div className="graficoGina">
          <GinaGrafico ginaInfo={answersPeriod} />
        </div>
      </div>
      <div className="ginaRight">
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
