import React, { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";

import SonoQualidade from "./SonoQualidade";
import SonoSonolencia from "./SonoSonolencia";

import DatePicker from "react-datepicker";
import cruz from "../img/cruz.png";
import { Slider } from "@material-ui/core";
import pt from "date-fns/locale/pt";

import "react-datepicker/dist/react-datepicker.css";

const FDSono = (props) => {
  registerLocale("pt", pt);
  const sono = props;
  const patientId = sono.sono;

  const [comoDormiu, setComoDormiu] = useState(0);
  const [problemasAsma, setProblemasAsma] = useState([]);
  const [sonolento, setSonolento] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [answers, setAnswers] = useState([]);

  useEffect(async () => {
    const fetchSono = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponseAll?id=${patientId}&code=Q801PTpt_1.0`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setAnswers(data);
      if (data[0] != undefined) {
        return data[0].all;
      }
      return [];
    };

    const informationRegister = async () => {
      let data = await fetchSono(patientId);
      if (data.authored !== undefined) {
        var lastDate = new Date(
          data.authored.substring(0, 4),
          data.authored.substring(6, 7) - 1,
          data.authored.substring(8, 10)
        );
        setStartDate(lastDate);
        let arrayAnswer = data.item;

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
      }
    };
    await informationRegister();
  }, []);

  function findAnswerData(dateChosed) {
    for (let i = 0; i < answers.length; i++) {
      let answerDate = answers[i].all.authored;

      if (
        answerDate.substring(0, 4) == dateChosed.getFullYear() &&
        answerDate.substring(6, 7) == dateChosed.getMonth() + 1 &&
        answerDate.substring(8, 10) == dateChosed.getDate()
      ) {
        return answers[i].all.item;
      }
    }
    return [];
  }

  const informationRegister = async (dateChosed) => {
    let arrayAnswer = findAnswerData(dateChosed);
    let dateError = document.getElementById("dateError");

    if (arrayAnswer.length === 0) {
      setComoDormiu(0);
      setProblemasAsma(" ");
      setSonolento(0);

      dateError.style.display = "flex";
      return;
    }

    dateError.style.display = "none";
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

  return (
    <div className="sonoPanel">
      <div className="sonoLeft">
        <div className="sonoData">
          <div>Últimas respostas a</div>
          <DatePicker
            className="sonoChooseData"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              informationRegister(date);
            }}
            locale="pt"
            dateFormat="dd-MM-yyyy"
          />
          <div className="dateError" id="dateError">
            Sem resultados
          </div>
        </div>

        <div className="sonoDormir">
          <div>Como dormiu a noite passada?</div>
          <div className="graficoComoDormiu">
            <Slider
              style={{ color: "#175874" }}
              disabled
              value={comoDormiu}
              aria-labelledby="disabled-slider"
              valueLabelDisplay="on"
            />
            <div className="sonoLegenda">
              <div>Muito Bem</div>
              <div>Muito Mal</div>
            </div>
          </div>
        </div>

        <div className="sonoAsma">
          <div>
            Os seus problemas de sono da noite passada foram relacionados com a
            sua asma?
          </div>
          <div className="graficoComoDormiuAsma">
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
          <div className="graficoSonolento">
            <Slider
              style={{ color: "#175874" }}
              disabled
              value={sonolento}
              aria-labelledby="disabled-slider"
              valueLabelDisplay="on"
            />
            <div className="sonoLegenda">
              <div>Nada</div>
              <div>Muito Bem</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sonoRight">
        <div className="qualidadeSono">
          <p>Qualidade do Sono</p>
          <div className="graficoRight">
            <SonoQualidade {...props} data={answers} />
          </div>
        </div>
        <div className="sonolencia">
          <p>Sonolência</p>
          <div className="graficoRight">
            <SonoSonolencia {...props} data={answers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDSono;
