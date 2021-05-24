import React, { useEffect, useState } from "react";
import InicioCARAT from "./InicioCARAT";
import InicioAdesao from "./InicioAdesao";
import FDMedicacaoInicio from "../Components/FDMedicacaoInicio";

import downArrow from "../img/avanco-rapido.png";
import informationButton from "../img/botao-de-informacao.png";
import inspirer from "../img/inspirermundi.png";
import airdoc from "../img/airdoc.png";

const FDInicio = (props) => {
  const inicio = props;
  const patientId = inicio.inicio;
  const [medicationList, setMedicationList] = useState([]);

  useEffect(() => {
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
    fetchMedication(patientId);
  }, []);

  return (
    <div id="specific" style={{ display: "flex", flexDirection: "row" }}>
      <div className="central" id="central">
        <div className="notasGerais">
          <div className="indicatores">
            Notas Gerais
            <img className="downArrow" src={downArrow} alt="" />
          </div>
        </div>
        <div className="centroInferior">
          <div className="exacerbacoes">
            <div className="indicatores">
              Exacerbações
              <img className="info" src={informationButton} alt="" />
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Última </div>
                <div className="periodo"> Semana </div>
              </div>
              <div className="square"></div>
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Último </div>
                <div className="periodo"> Mês </div>
              </div>
              <div className="square"></div>
            </div>

            <div className="exacerbacoesInfo">
              <div>
                <div className="ultima"> Último </div>
                <div className="periodo"> Ano </div>
              </div>
              <div className="square"></div>
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
              <div className="graficosInicio">{<InicioCARAT />}</div>

              <div className="caratInfo">
                <div className="ultima"> Último registo </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="medicacao" id="medicacao2">
        <div className="medicacao2">
          <div className="indicatores">Medicação Habitual</div>
          <div className="tableMedicationHeader">
            <div className="lineMedicationHeader"> Nome </div>
            <div className="lineMedicationHeader"> Modo de toma </div>
            <div className="lineMedicationHeader"> Frequência </div>
            <div className="lineMedicationHeader"> Hora </div>
            <div className="lineMedicationHeader"> Dose </div>
          </div>
          <div className="MedicationInfo">
            <FDMedicacaoInicio medicationList={medicationList} />
          </div>
        </div>

        <div className="adesao">
          <div className="indicatores">
            <div>Adesão Global</div>
            <div style={{ height: "100%" }}>
              <img className="inspirer" src={inspirer} alt="" />
              <img className="downArrow" src={downArrow} alt="" />
            </div>
          </div>
          <div className="adesao2">
            <div className="graficosInicio">{<InicioAdesao />}</div>

            <div className="caratInfo">
              <div> Objetivo: </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FDInicio;
