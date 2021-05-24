import React from "react";
import play from "../img/botao-play-ponta-de-seta.png";

const FDSons = (props) => {
  const { sons } = props;

  return (
    <div className="sons">
      <div className="tableSoundsHeader">
        <div className="lineSoundHeader" style={{ width: "5%" }}></div>
        <div className="lineSoundHeader"> Data </div>
        <div className="lineSoundHeader"> Tipo </div>
        <div className="lineSoundHeader"> Notas Utente </div>
        <div className="lineSoundHeader"> Notas Médico </div>
      </div>

      <div className="sonsInfo">
        {sons.map(({ contentData, createdDateTime, type }) => (
          <div className="tableSounds">
            <div
              className="lineSound"
              onClick={() => {
                new Audio("data:audio/wav;base64," + contentData).play();
              }}
              style={{ width: "5%", cursor: "pointer" }}
            >
              {" "}
              <img width="40%" src={play} alt="" />
            </div>
            <div className="lineSound">
              {" "}
              {createdDateTime.substring(0, 10)}{" "}
            </div>
            <div className="lineSound"> {type} </div>
            <div className="lineSound"> {} </div>
            <div className="lineSound"> {} </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FDSons;
