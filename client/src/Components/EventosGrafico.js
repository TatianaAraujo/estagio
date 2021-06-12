import React from "react";
import { Bar, Line } from "react-chartjs-2";

import entubVentMecanica from "../img/entubventmecanica.png";
import intensivista from "../img/intensivista.png";
import internamento from "../img/internamento.png";
import consulta from "../img/consulta.png";
import medicacao from "../img/medicacao.png";

import moment from "moment";

const startDate = new Date(2020, 0, 1);
let info = [{}];
const labels = [];

for (let i = 1; i < 6; i++) {
  const date = moment(startDate).add(i, "days").format("YYYY-MM-DD");
  labels.push(date.toString());
}

const data2 = [1, [2, 3], 3, 5, [1, 4]];

const data = () => {
  return {
    labels,
    datasets: [
      {
        borderColor: "#ff0303",
        showLine: false,
        fill: false,
        borderWidth: 0,
        tension: 0,
        backgroundColor: "#d4bebe",
        data: data2, //[1, 2, 3, 4, 5],
        ////data: [1, 3, 2, 4, 0],
      },
    ],
  };
};
const EventosGrafico = (props) => {
  const adesao = props;
  const patientId = adesao.adesao;
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
          <img src={entubVentMecanica} height="15%" width="55%" alt="" />
          <div>Entubação/Ventilação</div>
          <img src={intensivista} height="15%" width="55%" alt="" />
          <div>Cuidados Intensivos</div>
          <img src={internamento} height="15%" width="55%" alt="" />
          <div>Internamento</div>
          <img src={consulta} height="15%" width="55%" alt="" />
          <div>SU/Consulta não programada</div>
          <img src={medicacao} height="15%" width="55%" alt="" />
          <div>Corticóide</div>
        </div>

        <div className="graficoPontosEventos">
          <Bar
            data={data}
            width={100}
            height={90}
            options={{
              legend: {
                display: false,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      max: 5,
                      min: 0.3,
                      stepSize: 1,
                      display: false,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default EventosGrafico;
