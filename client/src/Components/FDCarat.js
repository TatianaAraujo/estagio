import React, { useState, useEffect } from "react";
import calendar from "../img/calendar.png";
import { Switch, Route } from "react-router-dom";

import CaratTotal from "./CaratTotal";
import CaratVAS from "./CaratVAS";
import CaratVAI from "./CaratVAI";
import CaratMenu from "./CaratMenu";

const FDCarat = (props) => {
  const carat = props;
  const patientId = carat.carat;

  const [allAnswers, setAllAnswers] = useState([]);
  const [answersPeriod, setAnswersPeriod] = useState([]);

  useEffect(async () => {
    const fetchCarat = async (patientId) => {
      const res = await fetch(`/Observations?id=${patientId}&code=2_901_0`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAllAnswers(data);
      setAnswersPeriod(data);
    };
    await fetchCarat(patientId);
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
      let answerDate = allAnswers[i].all.effectiveDateTime;
      console.log(allAnswers[i].all.effectiveDateTime);
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
    <div className="caratPanel">
      <div className="adesaoLeft">
        <CaratMenu />
        <div className="graficoAdesao">
          <Switch>
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratTotal"
              render={(props) => (
                <CaratTotal {...props} caratInfo={answersPeriod} />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratVAI"
              render={(props) => (
                <CaratVAI {...props} caratInfo={answersPeriod} />
              )}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Carat/CaratVAS"
              render={(props) => (
                <CaratVAS {...props} caratInfo={answersPeriod} />
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="caratRight">
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
export default FDCarat;
