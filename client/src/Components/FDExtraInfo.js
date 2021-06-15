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
  alergiasInfo.set("2_5.31", "Alergia a pólens");
  alergiasInfo.set("2_5.32", "Alergia ao mofo");
  alergiasInfo.set("2_5.40", "Ocupacional/Alergia relacionada com o trabalho");
  alergiasInfo.set("2_5.50", "Alergia a outros animais");
  alergiasInfo.set("2_5.51", "Alergia epitelial a outros animais");
  alergiasInfo.set("2_5.53", "Alergia a carne");
  alergiasInfo.set("2_5.54", "Alergia a gatos");
  alergiasInfo.set("2_5.55", "Alergia a cães");
  alergiasInfo.set("2_5.60", "Alergia a medicação");
  alergiasInfo.set("2_5.0", "Outras alergias não especificadas");

  //Comorbilidades -> Tudo Conditions
  const [comorbilidades, setComorbilidades] = useState([]);
  let comorbilidadesSet = [];
  let comorbilidadesInfo = new Map();
  comorbilidadesInfo.set("D_1.7_1", "Bronquiectasia confirmada");
  comorbilidadesInfo.set("D_1.7_2", "Bronquiectasia não confirmada");
  comorbilidadesInfo.set("D_1.8_1", "Polipose nasal confirmada");
  comorbilidadesInfo.set("D_1.8_2", "Polipose nasal não confirmada");

  //Diagnósticos -> Tudo Condition
  const [diagnosticos, setDiagnosticos] = useState([]);
  let diagnosticosSet = [];
  let diagnosticosInfo = new Map();
  diagnosticosInfo.set("D_1.1_1", "Asma Confirmado");
  diagnosticosInfo.set("D_1.1_2", "Asma não Confirmado");
  diagnosticosInfo.set("D_1.2_1", "COPD Confirmado");
  diagnosticosInfo.set("D_1.2_2", "COPD não Confirmado");
  diagnosticosInfo.set("D_1.3_1", "Rinite Confirmado");
  diagnosticosInfo.set("D_1.3_2", "Rinite não Confirmado");
  diagnosticosInfo.set("D_1.4_1", "Rinossinusite Confirmado");
  diagnosticosInfo.set("D_1.4_2", "Rinossinusite não Confirmado");
  diagnosticosInfo.set("D_1.5_1", "Conjuntivite Confirmado");
  diagnosticosInfo.set("D_1.5_2", "Conjuntivite não Confirmado");

  //História de infeçoes
  const [infecoes, setInfecoes] = useState([]);
  let infecoesSet = [];
  let infecoesInfo = new Map();
  infecoesInfo.set("D_16.5_2.2", "pneumonia"); //Condition
  infecoesInfo.set("2_16.5_1.1", "Infeção respiratória na infância"); //Observation
  infecoesInfo.set("2_16.5_2.1", "Outra infeção respiratória"); //Observation
  infecoesInfo.set("2_16.5_3", "Infeção respiratória nos últimos 3 meses"); //Observation

  //Habitos
  const [habitos, setHabitos] = useState([]);

  //Outros
  const [gravidez, setGravidez] = useState([]);
  const [amamentar, setAmamentar] = useState([]);

  useEffect(async () => {
    //Carateristicas Gerais
    const getHeight = async () => {
      const res = await fetch(`/Observation/Height?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setHeight(data[0]);
    };
    await getHeight(patientId);

    const getWeight = async () => {
      const res = await fetch(`/Observation/Weight?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setWeight(data[0]);
    };
    await getWeight(patientId);

    const getQuestionnaireResponse = async (code) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=${code}`,
        {
          accept: "application/json",
        }
      );
      const d = await res.json();
      if (d.length > 0) return d;
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
      //Apenas vai buscar a escolaridade Q02PTpt_1.0 (questionario)
      const qr = await getQuestionnaireResponse("Q02PTpt_1.0");
      let answer = qr[0].all[0].answer[0].valueCoding.code;
      for (var [key, value] of geraisInfo) {
        if (key === answer) {
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

    const gethabitosInfo = async () => {
      let qr = await getQuestionnaireResponse("Q510PTpt_1.0");
      let qrAnswer = qr[0].all[0];
      qrAnswer.answer[0].valueCoding.code === "A.1"
        ? setHabitos("Fumador")
        : setHabitos("Não Fumador");
    };
    gethabitosInfo();

    const getOutrosInfo = async () => {
      let qr = await getQuestionnaireResponse("Q502PTpt_1.0");
      qr[0].all[0].answer[0].valueCoding.code === "A.1"
        ? setGravidez(
            "Gravidez " + qr[0].all[1].answer[0].valueInteger + " semanas"
          )
        : setGravidez("");

      qr[0].all[2].answer[0].valueCoding.code === "A.1"
        ? setAmamentar("A amamentar")
        : setAmamentar("");
    };
    getOutrosInfo();
  }, []);

  const geraisItems = gerais.map((n, index) => (
    <div className="infoText" key={index}>
      {n}
    </div>
  ));
  const alergiasItems = alergias.map((n, index) => (
    <div className="infoText" key={index}>
      {n}
    </div>
  ));
  const comorbilidadesItems = comorbilidades.map((n, index) => (
    <div className="infoText" key={index}>
      {n}
    </div>
  ));
  const diagnosticosItems = diagnosticos.map((n, index) => (
    <div className="infoText" key={index}>
      {n}
    </div>
  ));
  const infecoesItems = infecoes.map((n, index) => (
    <div className="infoText" key={index}>
      {n}
    </div>
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
            <div className="infoText">{habitos}</div>
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
            <div className="infoText">{gravidez}</div>
            <div className="infoText">{amamentar}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDExtraInfo;
