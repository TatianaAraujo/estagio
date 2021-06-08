import React, { useState, useEffect } from "react";

const FDExtraInfo = (props) => {
  const inicio = props;
  const patientId = inicio.id;

  //Carateristicas Gerais
  const [height, setHeight] = useState([]);
  const [weight, setWeight] = useState([]);
  const [gerais, setGerais] = useState([]);
  let geraisSet = [];
  let geraisInfo = new Map();
  geraisInfo.set("J.1", "Escolaridade: Nenhum nível completo");
  geraisInfo.set("J.2", "Escolaridade: 4º ano");
  geraisInfo.set("J.3", "Escolaridade: 6º ano");
  geraisInfo.set("J.4", "Escolaridade: 9º ano");
  geraisInfo.set("J.5", "Escolaridade: 12º ano");
  geraisInfo.set("J.6", "Escolaridade: Ensino superior");

  //Alergias e Exposições  -> Tudo observation
  const [alergias, setAlergias] = useState([]);
  let alergiasSet = [];
  let alergiasInfo = new Map();
  alergiasInfo.set("2_5.20", "Alergia a comida");
  alergiasInfo.set("2_5.31", "Alergia a polens");
  alergiasInfo.set("2_5.32", "Alergia ao mofo");
  alergiasInfo.set("2_5.40", "Ocupacional/Alergia relacionada com o trabalho");
  alergiasInfo.set("2_5.50", "Alergia a outros animais");
  alergiasInfo.set("2_5.51", "Alergia epitelial a outros animais");
  alergiasInfo.set("2_5.53", "Alergia a carne");
  alergiasInfo.set("2_5.54", "Alergia a gatos");
  alergiasInfo.set("2_5.55", "Alergia a cães");
  alergiasInfo.set("2_5.60", "Alergia a medicacao");
  alergiasInfo.set("2_5.0", "Outras alergias não especificadas");

  //Comorbilidades -> Tudo Conditions
  const [comorbilidades, setComorbilidades] = useState([]);
  let comorbilidadesSet = [];
  let comorbilidadesInfo = new Map();
  comorbilidadesInfo.set("D_1.7_1", "Bronquiectasia confirmada");
  comorbilidadesInfo.set("D_1.7_2", "Bronquiectasia não confirmada");
  comorbilidadesInfo.set("D_1.8_1", "polipose nasal confirmada");
  comorbilidadesInfo.set("D_1.8_2", "polipose nasal não confirmada");

  //Diagnósticos -> Tudo Condition
  const [diagnosticos, setDiagnosticos] = useState([]);
  let diagnosticosSet = [];
  let diagnosticosInfo = new Map();
  diagnosticosInfo.set("D_1.1_1", "Asma Confirmado");
  diagnosticosInfo.set("D_1.1_2", "Asma não Confirmado");
  diagnosticosInfo.set("D_1.2_1", "COPD Confirmado");
  diagnosticosInfo.set("D_1.2_2", "COPD não Confirmado");
  diagnosticosInfo.set("D_1.3_1", "rinite Confirmado");
  diagnosticosInfo.set("D_1.3_2", "rinite não Confirmado");
  diagnosticosInfo.set("D_1.4_1", "rinossinusite Confirmado");
  diagnosticosInfo.set("D_1.4_2", "rinossinusite não Confirmado");
  diagnosticosInfo.set("D_1.5_1", "conjuntivite Confirmado");
  diagnosticosInfo.set("D_1.5_2", "conjuntivite não Confirmado");

  //História de infeçoes
  const [infecoes, setInfecoes] = useState([]);
  let infecoesSet = [];
  let infecoesInfo = new Map();
  infecoesInfo.set("D_16.5_2.2", "pneumonia"); //Condition
  infecoesInfo.set("2_16.5_1.1", "Infeção respiratória na adolescência"); //Observation
  infecoesInfo.set("2_16.5_2.1", "Outra infeção respiratória"); //Observation
  infecoesInfo.set("2_16.5_3", "Infeção respiratória nos últimos 3 meses"); //Observation

  useEffect(() => {
    //Carateristicas Gerais
    const getHeight = async () => {
      const res = await fetch(`/Observation/Height?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setHeight(data[0]);
    };
    getHeight(patientId);

    const getWeight = async () => {
      const res = await fetch(`/Observation/Weight?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setWeight(data[0]);
    };
    getWeight(patientId);

    const getQuestionnaireResponse = async (code) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=${code}`,
        {
          accept: "application/json",
        }
      );
      const d = await res.json();
      if (d.length > 0) return 1;
      return undefined;
    };

    const getCondition = async (code) => {
      const res = await fetch(`/Condition?id=${patientId}&code=${code}`, {
        accept: "application/json",
      });
      const d = await res.json();
      if (d.length > 0) return 1;
      return undefined;
    };

    const getObservation = async (code) => {
      const res = await fetch(`/Observation?id=${patientId}&code=${code}`, {
        accept: "application/json",
      });
      const d = await res.json();
      if (d.length > 0) return 1;
      return undefined;
    };

    const getGeraisInfo = async () => {
      for (var [key, value] of geraisInfo) {
        const i = await getQuestionnaireResponse(key);
        if (i !== undefined) {
          geraisSet.push(value);
        }
      }
      setGerais(geraisSet);
    };
    getGeraisInfo();

    const getDiagnosticosInfo = async () => {
      for (var [key, value] of diagnosticosInfo) {
        const i = await getCondition(key);
        if (i !== undefined) {
          diagnosticosSet.push(value);
        }
      }
      setDiagnosticos(diagnosticosSet);
    };
    getDiagnosticosInfo();

    const getAlergiasInfo = async () => {
      for (var [key, value] of alergiasInfo) {
        const i = await getObservation(key);
        if (i !== undefined) {
          alergiasSet.push(value);
        }
      }
      setAlergias(alergiasSet);
    };
    getAlergiasInfo();

    const getComorbilidadesInfo = async () => {
      for (var [key, value] of comorbilidadesInfo) {
        const i = await getCondition(key);
        if (i !== undefined) {
          comorbilidadesSet.push(value);
        }
      }
      setComorbilidades(comorbilidadesSet);
    };
    getComorbilidadesInfo();

    const getInfecoesInfo = async () => {
      for (var [key, value] of infecoesInfo) {
        let i;
        if (key === "D_16.5_2.2") i = await getCondition(key);
        else i = await getObservation(key);
        if (i !== undefined) {
          infecoesSet.push(value);
        }
      }
      setInfecoes(infecoesSet);
    };
    getInfecoesInfo();
  }, []);

  const geraisItems = gerais.map((n) => <div className="infoText">{n}</div>);
  const alergiasItems = alergias.map((n) => (
    <div className="infoText">{n}</div>
  ));
  const comorbilidadesItems = comorbilidades.map((n) => (
    <div className="infoText">{n}</div>
  ));
  const diagnosticosItems = diagnosticos.map((n) => (
    <div className="infoText">{n}</div>
  ));
  const infecoesItems = infecoes.map((n) => (
    <div className="infoText">{n}</div>
  ));

  return (
    <div className="infoExtraPanel1">
      <div className="infoExtraPanel2">
        <div className="infoLine">
          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Carateristicas Gerais
            </div>

            {height !== undefined ? (
              <div className="infoText">
                Altura ({height.unit}): {height.value}
              </div>
            ) : (
              <div></div>
            )}

            {weight !== undefined ? (
              <div className="infoText">
                Peso ({weight.unit}): {weight.value}
              </div>
            ) : (
              <div></div>
            )}
            {geraisItems}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Alergias e exposições
            </div>
            {alergiasItems}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Comorbilidades
            </div>
            {comorbilidadesItems}
          </div>
        </div>

        <div className="infoLine">
          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Hábitos
            </div>
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Diagnósticos
            </div>
            {diagnosticosItems}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Histórico de Infeções
            </div>
            {infecoesItems}
          </div>
        </div>

        <div className="infoLine">
          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Outros
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDExtraInfo;
