import React from "react";
import { Line, Chart } from "react-chartjs-2";

import entubVentMecanica from "../img/entubventmecanica.png";
import intensivista from "../img/intensivista.png";
import internamento from "../img/internamento.png";
import consulta from "../img/consulta.png";
import medicacao from "../img/medicacao.png";

const EventosGrafico = (props) => {
  const eventos = props;
  const eventosInfo = eventos.eventosInfo;

  let dates = [];
  let values0 = [];
  let values1 = [];
  let values2 = [];
  let values3 = [];
  let values4 = [];
  let values5 = [];
  let flag = 0;

  for (let i = 0; i < eventosInfo.length; i++) {
    let value1 = null;
    let value2 = null;
    let value3 = null;
    let value4 = null;
    let value5 = null;
    const answers = eventosInfo[i].all.item;
    for (let j = 0; j < answers.length; j++) {
      if (
        answers[j].linkId === "Q301_1.1" &&
        answers[j].answer[0].valueCoding.code === "A.2"
      ) {
        flag = 1;
        break;
      }

      if (answers[j].linkId === "Q301_1.2")
        dates.unshift(answers[j].answer[0].valueDate);

      if (answers[j].answer[0].valueCoding !== undefined) {
        if (answers[j].linkId === "Q301_2.1") {
          if (answers[j].answer[0].valueCoding.code === "A.1") value1 = 1;
        } else if (answers[j].linkId === "Q301_2.3") {
          if (answers[j].answer[0].valueCoding.code === "A.1") value2 = 2;
        } else if (answers[j].linkId === "Q301_2.2") {
        } else if (answers[j].linkId === "Q301_2.4") {
          if (answers[j].answer[0].valueCoding.code === "A.1") value3 = 3;
        } else if (answers[j].linkId === "Q301_2.5") {
          if (answers[j].answer[0].valueCoding.code === "A.1") value4 = 4;
        }
      }
    }
    if (flag !== 1) {
      values0.unshift(0);
      values1.unshift(value1);
      values2.unshift(value2);
      values3.unshift(value3);
      values4.unshift(value4);
      values5.unshift(value5);
    }
    flag = 0;
  }
  Chart.defaults.font.size = 12;

  const data = () => {
    return {
      labels: dates,
      datasets: [
        {
          //linha 1
          label: " ",
          showLine: false,
          fill: false,
          borderWidth: 0,
          tension: 0,
          backgroundColor: "white",
          data: values0,
        },
        {
          //linha 1
          label: "corticoide",
          showLine: false,
          fill: false,
          borderWidth: 15,
          borderColor: "#ff0303",
          tension: 0,
          backgroundColor: "#7d0101",
          data: values1,
        },
        {
          //linha 2
          label: "Consulta não programada",
          type: "line",
          borderColor: "#ff0303",
          showLine: false,
          fill: false,
          borderWidth: 15,
          tension: 0,
          backgroundColor: "#7d0101",
          data: values2,
        },
        {
          //linha 3
          label: "Internamento",
          borderColor: "#ff0303",
          showLine: false,
          fill: false,
          borderWidth: 15,
          tension: 0,
          backgroundColor: "#7d0101",
          data: values3,
        },
        {
          //linha 4
          label: "UCI",
          borderColor: "#ff0303",
          showLine: false,
          fill: false,
          borderWidth: 15,
          tension: 0,
          backgroundColor: "#7d0101",
          data: values4,
        },
        {
          //linha 5
          label: "Entubação",
          borderColor: "#ff0303",
          showLine: false,
          fill: false,
          borderWidth: 15,
          tension: 0,
          backgroundColor: "#7d0101",
          data: [5, 5, 5, 5, 5, 5, 5, 5],
        },
      ],
    };
  };

  return (
    <div className="graficoEventos2">
      <div className="graficoEventosDiv">
        <div className="graficoEventosLegendaCores">
          <div
            className="legendaCor"
            style={{ backgroundColor: "#7d0101" }}
          ></div>
          <div
            className="legendaCor"
            style={{ backgroundColor: "#a91919" }}
          ></div>
          <div
            className="legendaCor"
            style={{ backgroundColor: "#b40000" }}
          ></div>
          <div
            className="legendaCor"
            style={{ backgroundColor: "#d60000" }}
          ></div>
          <div
            className="legendaCor"
            style={{ backgroundColor: "#ff0303" }}
          ></div>
        </div>

        <div className="graficoEventosLegenda">
          <img src={entubVentMecanica} height="11%" width="50%" alt="" />
          <div>Entubação/Ventilação</div>
          <img src={intensivista} height="12%" width="50%" alt="" />
          <div>Cuidados Intensivos</div>
          <img src={internamento} height="11.5%" width="50%" alt="" />
          <div>Internamento</div>
          <img src={consulta} height="12%" width="50%" alt="" />
          <div>SU/Consulta não programada</div>
          <img src={medicacao} height="11%" width="50%" alt="" />
          <div>Corticóide</div>
        </div>

        <div className="graficoPontosEventos">
          <Line
            data={data}
            width={100}
            height={88}
            options={{
              plugins: {
                legend: false,
              },
              scales: {
                yAxes: [
                  {
                    beginAtZero: true,
                    ticks: {
                      max: 5,
                      stepSize: 1,
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
          <div className="whiteDiv"></div>
        </div>
      </div>
    </div>
  );
};
export default EventosGrafico;
