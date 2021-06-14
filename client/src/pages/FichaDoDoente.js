import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import lupa from "../img/lupa.png";
import resSys from "../img/respiratory-system.png";
import downArrow from "../img/avanco-rapido.png";

import FDCabecalho from "../Components/FDCabecalho";
import FDInicio from "../Components/FDInicio";
import FDMcdt from "../Components/FDMcdt";
import FDSons from "../Components/FDSons";
import FDMenu from "../Components/FDMenu";
import FDAdesao from "../Components/FDAdesao";
import FDMedicacao from "../Components/FDMedicacao";
import FDCarat from "../Components/FDCarat";
import FDEventos from "../Components/FDEventos";
import FDEstado from "../Components/FDEstado";
import FDGina from "../Components/FDGina";
import FDSono from "../Components/FDSono";
import FDPlanos from "../Components/FDPlanos";
import FDExtraInfo from "../Components/FDExtraInfo";

const FichaDoDoente = () => {
  const history = useHistory();

  const addBodyClass = (className) => document.body.classList.add(className);
  const removeBodyClass = (className) =>
    document.body.classList.remove(className);
  const patientId = useSelector((state) => state.fichaDoDoente.id);
  const [showDataPath] = useState("/FichaDoDoente/");

  //Diagnósticos -> Tudo Condition
  const [diagnosticos, setDiagnosticos] = useState([]);
  let diagnosticosSet = [];
  let diagnosticosInfo = new Map();
  diagnosticosInfo.set("D_1.1_1", { Text: "Asma", Validate: 1 }); //Validado - 1
  diagnosticosInfo.set("D_1.1_2", { Text: "Asma", Validate: 2 }); //Não validado - 2
  diagnosticosInfo.set("D_1.2_1", { Text: "COPD", Validate: 1 });
  diagnosticosInfo.set("D_1.2_2", { Text: "COPD", Validate: 2 });
  diagnosticosInfo.set("D_1.3_1", { Text: "Rinite", Validate: 1 });
  diagnosticosInfo.set("D_1.3_2", { Text: "Rinite", Validate: 2 });
  diagnosticosInfo.set("D_1.4_1", { Text: "rinossinusite", Validate: 1 });
  diagnosticosInfo.set("D_1.4_2", { Text: "rinossinusite", Validate: 2 });
  diagnosticosInfo.set("D_1.5_1", { Text: "conjuntivite", Validate: 1 });
  diagnosticosInfo.set("D_1.5_2", { Text: "conjuntivite", Validate: 2 });

  useEffect(() => {
    addBodyClass("body-transparent");
    removeBodyClass("body");
    history.push(showDataPath);
    personInformation(patientId);

    const getCondition = async (code) => {
      const res = await fetch(`/Condition?id=${patientId}&code=${code}`, {
        accept: "application/json",
      });
      const d = await res.json();
      if (d.length > 0) return 1;
      return undefined;
    };

    const getDiagnosticosInfo = async () => {
      for (var [key, value] of diagnosticosInfo) {
        const i = await getCondition(key);
        if (i !== undefined) {
          diagnosticosSet.push({ text: value.Text, validado: value.Validate });
        }
      }
      console.log(diagnosticosSet);
      setDiagnosticos(diagnosticosSet);
    };
    getDiagnosticosInfo();
  }, []);

  const getAge = (birthDate) => {
    const birthDateYear = parseInt(birthDate.slice(0, 4));
    const birthDateMonth = parseInt(birthDate.slice(5, 7));
    const birthDateDay = 1;
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    let age = currentYear - birthDateYear;
    if (
      currentMonth < birthDateMonth ||
      (currentMonth === birthDateMonth && currentDay < birthDateDay)
    ) {
      age--;
    }
    return age < 0 ? 0 : age;
  };

  const personInformation = (patientId) => {
    fetch(`/patient?id=${patientId}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((patient) => {
        const age = getAge(patient.birthDate);
        if (patient.gender === "male") patient.gender = "M";
        else patient.gender = "F";
        document.getElementById("dados").innerHTML =
          patient.name +
          " " +
          patient.surname +
          ",   " +
          patient.gender +
          " (" +
          age +
          "anos)";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let flag = 0;
  const changeBottomInformation = () => {
    if (flag === 0) {
      const gIE = document.getElementById("generalInformationExtra");
      gIE.style.borderRight = " 2px solid #707070";
      gIE.style.borderLeft = " 2px solid #707070";
      gIE.style.backgroundColor = "white";
      document.getElementById("specificInformationPanel").style.display =
        "none";
      document.getElementById("generalInformationPanel2").style.border =
        " 2px solid black";

      const eI = document.getElementById("extraInfo");
      eI.style.display = "flex";
      eI.style.marginTop = "0px";
      flag = 1;
    } else {
      const gIE = document.getElementById("generalInformationExtra");
      gIE.style.border = " 2px solid transparent";
      gIE.style.backgroundColor = "transparent";
      document.getElementById("specificInformationPanel").style.display =
        "flex";

      const eI = document.getElementById("extraInfo");
      eI.style.display = "none";
      eI.style.marginTop = "25px";
      flag = 0;
    }
  };

  return (
    <div>
      <div className="generalInformationPanel1">
        <img style={{ width: "5.5%" }} src={resSys} alt="" />
        <div className="generalInformationExtra" id="generalInformationExtra">
          <div
            className="generalInformationPanel2"
            id="generalInformationPanel2"
          >
            <div className="personInformation">
              <img
                style={{ width: "6%", cursor: "pointer" }}
                onClick={() => {
                  history.push("/ListaDeDoentes");
                }}
                src={lupa}
                alt=""
              />

              <div className="personInformation2">
                <div id="dados" className="patientData"></div>
                <hr></hr>
                <div className="ocupation"> Trabalha em </div>
              </div>
            </div>
            <div className="diagnosticosDiv">
              <FDCabecalho diagnosticos={diagnosticos} />
            </div>

            <div
              className="circle"
              onClick={() => {
                changeBottomInformation();
              }}
            >
              <img
                id="downArrow"
                className="downArrow"
                src={downArrow}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div id="specificInformationPanel" className="specificInformationPanel">
        {<FDMenu />}

        <div style={{ width: "80%" }}>
          <Switch>
            <Route path="/FichaDoDoente/MCDT" render={FDMcdt} />
            <Route
              path="/FichaDoDoente/SonsRespiratorios"
              render={(props) => <FDSons {...props} sons={patientId} />}
            />
            <Route path="/FichaDoDoente/Planos" render={FDPlanos} />
            <Route
              path="/FichaDoDoente/Monitorizacao/Sono"
              render={(props) => <FDSono {...props} sono={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Gina"
              render={(props) => <FDGina {...props} gina={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Estado"
              render={FDEstado}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Eventos"
              render={(props) => <FDEventos {...props} eventos={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/CARAT"
              render={(props) => <FDCarat {...props} carat={patientId} />}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Medicacao"
              render={FDMedicacao}
            />
            <Route
              path="/FichaDoDoente/Monitorizacao/Adesao/"
              render={(props) => <FDAdesao {...props} adesao={patientId} />}
            />
            <Route
              path="/FichaDoDoente/"
              render={(props) => <FDInicio {...props} inicio={patientId} />}
            />
          </Switch>
        </div>
      </div>

      <div
        id="extraInfo"
        className="specificInformationPanel"
        style={{ display: "none" }}
      >
        {<FDExtraInfo id={patientId} />}
      </div>
    </div>
  );
};

export default FichaDoDoente;
