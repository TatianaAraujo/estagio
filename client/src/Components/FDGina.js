import React, { useState, useEffect } from "react";

import calendar from "../img/calendar.png";

import GinaGrafico from "./GinaGrafico";

const FDGina = (props) => {
  const gina = props;
  const patientId = gina.gina;

  const [ginaInfo, setGinaInfo] = useState([]);

  useEffect(() => {
    /*const fetchGina = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponseAll?id=${patientId}&code=Q911PTpt_1.0`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setGinaInfo(data);
    };
    await fetchGina(patientId);*/

    fetch(`/QuestionnaireResponseAll?id=${patientId}&code=Q911PTpt_1.0`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((data) => {
        setGinaInfo(data);
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
  return (
    <div className="ginaPanel">
      <div className="ginaLeft">
        <div className="graficoGina">
          <GinaGrafico ginaInfo={ginaInfo} />
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
            <div className="periodosSchedule2" id="semana">
              Última Semana
            </div>
            <div className="periodosSchedule2" id="mes">
              Último Mês
            </div>
            <div className="periodosSchedule2" id="3meses">
              Últimos 3 Meses
            </div>
            <div className="periodosSchedule2" id="ano">
              Último Ano
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
