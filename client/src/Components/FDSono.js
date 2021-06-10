import React, { useEffect, useState } from "react";
import cruz from "../img/cruz.png";

const FDSono = (props) => {
  const sono = props;
  const patientId = sono.sono;

  const [comoDormiu, setComoDormiu] = useState([]);
  const [problemasAsma, setProblemasAsma] = useState([]);
  const [sonolento, setSonolento] = useState([]);

  useEffect(() => {
    const fetchSono = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=Q801PTpt_1.0`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      return data[0].all;
    };

    const informationRegister = async () => {
      let arrayAnswer = await fetchSono(patientId);
      for (let i = 0; i < arrayAnswer.length; i++) {
        switch (arrayAnswer[i].linkId) {
          case "Q801_3.1":
            setComoDormiu(arrayAnswer[i].answer[0].valueDecimal);
            break;
          case "Q801_3.2":
            setProblemasAsma(arrayAnswer[i].answer[0].valueCoding.code);
            break;
          case "Q801_4.1":
            setSonolento(arrayAnswer[i].answer[0].valueDecimal);
            break;
          default:
            break;
        }
      }
    };
    informationRegister();
  }, []);

  return (
    <div className="sonoPanel">
      <div className="sonoLeft">
        <div className="sonoData">
          <div>Últimas respostas a</div>
          <div className="sonoChooseData"></div>
        </div>

        <div className="sonoDormir">
          <div>Como dormiu a noite passada?</div>
          <div className="graficoComoDormiu"></div>
        </div>

        <div className="sonoAsma">
          <div>
            Os seus problemas de sono da noite passada foram relacionados com a
            sua asma?
          </div>
          <div className="graficoComoDormiu">
            <img style={{ width: "10%" }} src={cruz} alt="" />
            {problemasAsma === "A.1" ? (
              <div> Sim </div>
            ) : problemasAsma === "A.2" ? (
              <div> Não </div>
            ) : (
              <div> Não sei </div>
            )}
          </div>
        </div>
        <div className="sonoSonolento">
          <div>Esteve sonolento durante o dia?</div>
          <div className="graficoSonolento"></div>
        </div>
      </div>
      <div className="sonoRight">
        <div className="qualidadeSono">
          <p>Qualidade do Sono</p>
          <div className="graficoRight"></div>
        </div>
        <div className="sonolencia">
          <p>Sonolência</p>
          <div className="graficoRight"></div>
        </div>
      </div>
    </div>
  );
};
export default FDSono;
