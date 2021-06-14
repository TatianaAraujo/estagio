import React, { useState, useEffect } from "react";
import SonsTabela from "./SonsTabela";
import downArrow from "../img/avanco-rapido.png";

const FDSons = ({ patientId }) => {
  //const sons = props;
  //const patientId = sons.patientId;

  const [sonsInfo, setSonsInfo] = useState([]);
  const [filterOrdr, setFilterOrdr] = useState("ASC");

  useEffect(async () => {
    const fetchSons = async (patientId) => {
      const res = await fetch(`/media?patientId=${patientId}`, {
        accept: "application/json",
      });
      const data = await res.json();
      setSonsInfo(data);
    };
    await fetchSons(patientId);
  }, []);

  const sortData = () => {
    if (filterOrdr === "DESC") {
      const testSom = sonsInfo.sort(function (a, b) {
        if (a.createdDateTime > b.createdDateTime) {
          return 1;
        }
        if (a.createdDateTime < b.createdDateTime) {
          return -1;
        }
      });
      setSonsInfo(testSom);
    } else {
      const testSom = sonsInfo.sort(function (a, b) {
        if (a.createdDateTime < b.createdDateTime) {
          return 1;
        }
        if (a.createdDateTime > b.createdDateTime) {
          return -1;
        }
      });
      setSonsInfo(testSom);
    }
  };

  const sortData2 = () => {
    if (filterOrdr === "ASC") {
      setFilterOrdr("DESC");
    } else {
      setFilterOrdr("ASC");
    }
  };

  let changeTypeFlag = 0;
  const changeType = () => {
    const changeType = document.getElementById("changeType");
    if (changeTypeFlag === 0) {
      changeType.style.display = "flex";
      changeTypeFlag = 1;
    } else {
      changeType.style.display = "none";
      changeTypeFlag = 0;
    }
  };

  const selectType = (nome) => {
    let newSonsInfo = [];
    for (let i = 0; i < sonsInfo.length; i++) {
      if (sonsInfo[i].type !== nome) {
        sonsInfo[i].showItem = 0;
      } else {
        sonsInfo[i].showItem = 1;
      }
      if (nome === "todos") {
        sonsInfo[i].showItem = 1;
      }
      newSonsInfo.push(sonsInfo[i]);
    }
    changeType();
    setSonsInfo(newSonsInfo);
  };

  return (
    <div className="sons">
      <h2>Registo dos Sons Respiratórios</h2>
      <div className="tableSoundsHeader">
        <div className="lineSoundHeader" style={{ width: "5%" }}></div>

        <div className="lineSoundHeader" style={{ width: "23%" }}>
          <div className="lineSoundHeader2">
            <div>Data</div>
            <div className="circleSons">
              <img
                id="downArrow"
                className="downArrow"
                src={downArrow}
                alt=""
                onClick={() => {
                  sortData2();
                  sortData();
                }}
              />
            </div>
          </div>
        </div>

        <div className="changeType" id="changeType">
          <div
            className="changeTypeLine"
            onClick={() => {
              selectType("todos");
            }}
          >
            Todos
          </div>
          <div
            className="changeTypeLine"
            onClick={() => {
              selectType("Auscultação");
            }}
          >
            Auscultação
          </div>
          <div
            className="changeTypeLine"
            onClick={() => {
              selectType("Gravação livre");
            }}
          >
            Gravação Livre
          </div>
          <div
            className="changeTypeLine"
            onClick={() => {
              selectType("Função pulmonar");
            }}
          >
            Função Pulmonar
          </div>
        </div>

        <div className="lineSoundHeader" style={{ width: "23%" }}>
          <div className="lineSoundHeader2">
            <div>Tipo</div>
            <div className="circleSons">
              <img
                id="downArrow"
                className="downArrow"
                src={downArrow}
                alt=""
                onClick={() => {
                  changeType();
                }}
              />
            </div>
          </div>
        </div>

        <div className="lineSoundHeader" style={{ width: "23%" }}>
          Notas Utente
        </div>
        <div className="lineSoundHeader" style={{ width: "23%" }}>
          Notas Médico
        </div>
      </div>
      <SonsTabela sons={sonsInfo} />
    </div>
  );
};
export default FDSons;
