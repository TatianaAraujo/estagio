import React, { useState, useEffect } from "react";

const FDExtraInfo = (props) => {
  const inicio = props;
  const patientId = inicio.id;

  //Carateristicas Gerais
  const [height, setHeight] = useState([]);
  const [weight, setWeight] = useState([]);
  const [nenhumNivel, setNenhumNivel] = useState([]);
  const [basico1, setBasico1] = useState([]);
  const [basico2, setBasico2] = useState([]);
  const [basico3, setBasico3] = useState([]);
  const [secundario, setSecundario] = useState([]);
  const [superior, setSuperior] = useState([]);

  //Alergias e Exposiçoes
  const [alergyFood, setAlergyFood] = useState([]);
  const [alergyPollens, setAlergyPollens] = useState([]);
  const [alergyMold, setAlergyMold] = useState([]);
  const [alergyOtherAnimals, setAlergyOtherAnimals] = useState([]);
  const [alergyAnimalEpitelia, setAlergyAnimalEpitelia] = useState([]);
  const [alergyMite, setAlergyMite] = useState([]);
  const [alergyCat, setAlergyCat] = useState([]);
  const [alergyDog, setAlergyDog] = useState([]);
  const [alergyMedication, setAlergyMedication] = useState([]);

  //Diagnósticos
  const [asmaConfirmed, setAsmaConfirmed] = useState([]);
  const [asma, setAsma] = useState([]);
  const [COPDConfirmed, setCOPDConfirmed] = useState([]);
  const [COPD, setCOPD] = useState([]);
  const [rhinitisConfirmed, setRhinitisConfirmed] = useState([]);
  const [rhinitis, setRhinitis] = useState([]);
  const [rhinosinositisConfirmed, setRhinosinositisConfirmed] = useState([]);
  const [rhinosinositis, setRhinosinositis] = useState([]);
  const [conjuntivitisConfirmed, setConjuntivitisConfirmed] = useState([]);
  const [conjuntivitis, setConjuntivitis] = useState([]);

  //História de infeções
  const [pneumonia, setPneumonia] = useState([]);
  const [riChildwood, setRiChildwood] = useState([]);
  const [riOther, setRiOther] = useState([]);
  const [riLast3Months, setRiLast3Months] = useState([]);

  //Comorbilidades
  const [bronchiectasisConfirmed, setBronchiectasisConfirmed] = useState([]);
  const [bronchiectasis, setBronchiectasis] = useState([]);
  const [nasalPolyposisConfirmed, setNasalPolyposisConfirmed] = useState([]);
  const [nasalPolyposis, setNasalPolyposis] = useState([]);

  useEffect(() => {
    //Carateristicas Gerais

    const getHeight = async (patientId) => {
      const res = await fetch(`/Observation/Height?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setHeight(data[0]);
    };
    getHeight(patientId);

    const getWeight = async (patientId) => {
      const res = await fetch(`/Observation/Weight?id=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setWeight(data[0]);
    };
    getWeight(patientId);

    const getNenhumNivel = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.1`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setNenhumNivel(data[0]);
    };
    getNenhumNivel(patientId);

    const getBasico1 = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.2`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setBasico1(data[0]);
    };
    getBasico1(patientId);

    const getBasico2 = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.3`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setBasico2(data[0]);
    };
    getBasico2(patientId);

    const getBasico3 = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.4`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setBasico3(data[0]);
    };
    getBasico3(patientId);

    const getSecundario = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.5`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setSecundario(data[0]);
    };
    getSecundario(patientId);

    const getSuperior = async (patientId) => {
      const res = await fetch(
        `/QuestionnaireResponse?id=${patientId}&code=J.6`,
        {
          accept: "application/json",
        }
      );
      const data = await res.json();
      setSuperior(data[0]);
    };
    getSuperior(patientId);

    //Diagnósticos
    const getAsmaConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.1_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAsmaConfirmed(data[0]);
    };
    getAsmaConfirmed(patientId);

    const getAsma = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.1_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAsma(data[0]);
    };
    getAsma(patientId);

    const getCOPDConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.2_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setCOPDConfirmed(data[0]);
    };
    getCOPDConfirmed(patientId);

    const getCOPD = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.2_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setCOPD(data[0]);
    };
    getCOPD(patientId);

    const getRhinitisConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.3_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRhinitisConfirmed(data[0]);
    };
    getRhinitisConfirmed(patientId);

    const getRhinitis = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.3_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRhinitis(data[0]);
    };
    getRhinitis(patientId);

    const getRhinosinositisConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.4_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRhinosinositisConfirmed(data[0]);
    };
    getRhinosinositisConfirmed(patientId);

    const getRhinosinositis = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.4_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRhinosinositis(data[0]);
    };
    getRhinosinositis(patientId);

    const getConjuntivitisConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.5_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setConjuntivitisConfirmed(data[0]);
    };
    getConjuntivitisConfirmed(patientId);

    const getConjuntivitis = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.5_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setConjuntivitis(data[0]);
    };
    getConjuntivitis(patientId);

    //historico de infeções
    const getPneumonia = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_16.5_2.2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setPneumonia(data[0]);
    };
    getPneumonia(patientId);

    const getRiChildwood = async (patientId) => {
      const res = await fetch(`/Observation?id=${patientId}&code=2_16.5_1.1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRiChildwood(data[0]);
    };
    getRiChildwood(patientId);

    const getRiOther = async (patientId) => {
      const res = await fetch(`/Observation?id=${patientId}&code=2_16.5_2.1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRiOther(data[0]);
    };
    getRiOther(patientId);

    const getRiLast3Months = async (patientId) => {
      const res = await fetch(`/Observation?id=${patientId}&code=2_16.5_3`, {
        accept: "application/json",
      });
      const data = await res.json();
      setRiLast3Months(data[0]);
    };
    getRiLast3Months(patientId);

    //comorbilidades
    const getBronchiectasisConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.7_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setBronchiectasisConfirmed(data[0]);
    };
    getBronchiectasisConfirmed(patientId);

    const getBronchiectasis = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.7_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setBronchiectasis(data[0]);
    };
    getBronchiectasis(patientId);

    const getNasalPolyposisConfirmed = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.8_1`, {
        accept: "application/json",
      });
      const data = await res.json();
      setNasalPolyposisConfirmed(data[0]);
    };
    getNasalPolyposisConfirmed(patientId);

    const getNasalPolyposis = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=D_1.8_2`, {
        accept: "application/json",
      });
      const data = await res.json();
      setNasalPolyposis(data[0]);
    };
    getNasalPolyposis(patientId);

    //Alergias
    const getAlergyFood = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_20`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyFood(data[0]);
    };
    getAlergyFood(patientId);

    const getAlergyPollens = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_31`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyPollens(data[0]);
    };
    getAlergyPollens(patientId);

    const getAlergyMold = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_32`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyMold(data[0]);
    };
    getAlergyMold(patientId);

    const getAlergyOtherAnimals = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_50`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyOtherAnimals(data[0]);
    };
    getAlergyOtherAnimals(patientId);

    const getAlergyAnimalEpitelia = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_51`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyAnimalEpitelia(data[0]);
    };
    getAlergyAnimalEpitelia(patientId);

    const getAlergyMite = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_53`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyMite(data[0]);
    };
    getAlergyMite(patientId);

    const getAlergyCat = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_54`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyCat(data[0]);
    };
    getAlergyCat(patientId);

    const getAlergyDog = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_55`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyDog(data[0]);
    };
    getAlergyDog(patientId);

    const getAlergyMedication = async (patientId) => {
      const res = await fetch(`/Condition?id=${patientId}&code=2_5_60`, {
        accept: "application/json",
      });
      const data = await res.json();
      setAlergyMedication(data[0]);
    };
    getAlergyMedication(patientId);
  }, []);

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

            {nenhumNivel !== undefined ? (
              <div className="infoText">
                Escolaridade: Nenhum nível completo
              </div>
            ) : (
              <div></div>
            )}

            {basico1 !== undefined ? (
              <div className="infoText">Escolaridade: 4º ano</div>
            ) : (
              <div></div>
            )}

            {basico2 !== undefined ? (
              <div className="infoText">Escolaridade: 6º ano</div>
            ) : (
              <div></div>
            )}

            {basico3 !== undefined ? (
              <div className="infoText">Escolaridade: 9º ano</div>
            ) : (
              <div></div>
            )}

            {secundario !== undefined ? (
              <div className="infoText">Escolaridade: 12º ano</div>
            ) : (
              <div></div>
            )}

            {superior !== undefined ? (
              <div className="infoText">Escolaridade: Superior</div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Alergias e exposições
            </div>
            {alergyFood !== undefined ? (
              <div className="infoText"> Alimentos</div>
            ) : (
              <div></div>
            )}
            {alergyPollens !== undefined ? (
              <div className="infoText"> Pólens</div>
            ) : (
              <div></div>
            )}
            {alergyMold !== undefined ? (
              <div className="infoText"> Bolor</div>
            ) : (
              <div></div>
            )}
            {alergyOtherAnimals !== undefined ? (
              <div className="infoText"> Outros Animais</div>
            ) : (
              <div></div>
            )}
            {alergyAnimalEpitelia !== undefined ? (
              <div className="infoText"> Animais epitelia</div>
            ) : (
              <div></div>
            )}
            {alergyMite !== undefined ? (
              <div className="infoText"> Ácaros </div>
            ) : (
              <div></div>
            )}
            {alergyCat !== undefined ? (
              <div className="infoText"> Gatos </div>
            ) : (
              <div></div>
            )}
            {alergyDog !== undefined ? (
              <div className="infoText"> Cães </div>
            ) : (
              <div></div>
            )}
            {alergyMedication !== undefined ? (
              <div className="infoText"> Medicação </div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Comorbilidades
            </div>
            {bronchiectasisConfirmed !== undefined ? (
              <div className="infoText"> bronchiectasis Confirmed </div>
            ) : (
              <div></div>
            )}

            {bronchiectasis !== undefined ? (
              <div className="infoText"> bronchiectasis não Confirmed </div>
            ) : (
              <div></div>
            )}

            {nasalPolyposisConfirmed !== undefined ? (
              <div className="infoText"> nasalPolyposis Confirmed </div>
            ) : (
              <div></div>
            )}

            {nasalPolyposis !== undefined ? (
              <div className="infoText"> nasalPolyposis não Confirmed </div>
            ) : (
              <div></div>
            )}
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
            {asmaConfirmed !== undefined ? (
              <div className="infoText">Asma Confirmado</div>
            ) : (
              <div></div>
            )}

            {asma !== undefined ? (
              <div className="infoText">Asma não Confirmado</div>
            ) : (
              <div></div>
            )}

            {COPDConfirmed !== undefined ? (
              <div className="infoText">COPD Confirmado</div>
            ) : (
              <div></div>
            )}

            {COPD !== undefined ? (
              <div className="infoText">COPD não Confirmado</div>
            ) : (
              <div></div>
            )}

            {rhinitisConfirmed !== undefined ? (
              <div className="infoText">Rhinitis Confirmed </div>
            ) : (
              <div></div>
            )}

            {rhinitis !== undefined ? (
              <div className="infoText">Rhinitis não Confirmed </div>
            ) : (
              <div></div>
            )}

            {rhinosinositisConfirmed !== undefined ? (
              <div className="infoText">rhinosinositis Confirmed</div>
            ) : (
              <div></div>
            )}

            {rhinosinositis !== undefined ? (
              <div className="infoText">rhinosinositis não Confirmed</div>
            ) : (
              <div></div>
            )}

            {conjuntivitisConfirmed !== undefined ? (
              <div className="infoText">conjuntivitis Confirmed</div>
            ) : (
              <div></div>
            )}

            {conjuntivitis !== undefined ? (
              <div className="infoText">conjuntivitis não Confirmed</div>
            ) : (
              <div></div>
            )}
          </div>

          <div className="infoBlock">
            <div className="indicatores" style={{ color: "black" }}>
              Histórico de Infeções
            </div>
            {pneumonia !== undefined ? (
              <div className="infoText"> Pneumonia</div>
            ) : (
              <div></div>
            )}
            {riChildwood !== undefined ? (
              <div className="infoText"> Infeção respiratória na infância</div>
            ) : (
              <div></div>
            )}
            {riLast3Months !== undefined ? (
              <div className="infoText">
                {" "}
                Infeção respiratória nos últimos 3 meses
              </div>
            ) : (
              <div></div>
            )}
            {riOther !== undefined ? (
              <div className="infoText"> Outra infeção respiratória</div>
            ) : (
              <div></div>
            )}
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
