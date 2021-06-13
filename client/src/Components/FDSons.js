import React, { Component } from "react";
import play from "../img/botao-play-ponta-de-seta.png";
import downArrow from "../img/avanco-rapido.png";

const FDSons = (props) => {
  const { sons } = props;

  for (let i = 0; i < sons.length; i++) {
    if (sons[i].type == "Lung Function") {
      sons[i].type = "Função pulmonar";
    } else if (sons[i].type.includes("Auscultation")) {
      sons[i].type = "Auscultação";
    } else if (sons[i].type == "Free Recording") {
      sons[i].type = "Gravação livre";
    }
  }

  return (
    <div className="sons">
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
              />
            </div>
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
      <div className="sonsInfo">
        {sons.map(({ contentData, createdDateTime, type, note }, index) => (
          <div className="tableSounds" key={index}>
            <div
              className="lineSound"
              onClick={() => {
                new Audio("data:audio/wav;base64," + contentData).play();
              }}
              style={{ width: "5%", cursor: "pointer" }}
            >
              <img width="40%" src={play} alt="" />
            </div>
            <div className="lineSound">{createdDateTime.substring(0, 10)}</div>
            <div className="lineSound"> {type} </div>
            <div className="lineSound"> {note} </div>
            <div className="lineSound"> {} </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FDSons;
