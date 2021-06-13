import React, { useState } from "react";
import play from "../img/botao-play-ponta-de-seta.png";
import pause from "../img/pause.png";

const SonsTabela = (props) => {
  const { sons } = props;
  let newSons = sons.filter((sons) => sons.showItem > 0);
  const [playButtonType, setPlayButtonType] = useState(true);

  for (let i = 0; i < newSons.length; i++) {
    if (newSons[i].type == "Lung Function") {
      newSons[i].type = "Função pulmonar";
    } else if (newSons[i].type.includes("Auscultation")) {
      newSons[i].type = "Auscultação";
    } else if (newSons[i].type == "Free Recording") {
      newSons[i].type = "Gravação livre";
    }
  }

  var audio;
  const playSound = (e) => {
    e.target.id = "playing";
    const play = document.getElementById("playing");
    setPlayButtonType(false);
    //const pause = document.getElementById("pause");
    play.style.display = "none";
    pause.style.display = "flex";
    //audio = new Audio("data:audio/wav;base64," + contentData);
    //audio.play();
  };
  const pauseSound = (e) => {
    const playing = document.getElementById("playing");
    playing.id = "play";
    const pause = document.getElementById("pause");
    playing.style.display = "flex";
    pause.style.display = "none";

    //audio.pause();
  };
  const playButton = (
    <img
      style={{ display: "flex" }}
      id="play"
      width="40%"
      src={play}
      alt=""
      onClick={(e) => {
        playSound(e);
      }}
    />
  );

  const pauseButton = (
    <img
      style={{ display: "flex" }}
      id="pause"
      width="40%"
      src={pause}
      alt=""
      onClick={(e) => {
        pauseSound(e);
      }}
    />
  );
  return (
    <div className="sonsInfo">
      {newSons.map(({ contentData, createdDateTime, type, note }, index) => (
        <div className="tableSounds" key={index}>
          <div className="lineSound" style={{ width: "5%", cursor: "pointer" }}>
            {playButtonType ? playButton : pauseButton}
          </div>

          <div className="lineSound">{createdDateTime.substring(0, 10)}</div>
          <div className="lineSound"> {type} </div>
          <div className="lineSound"> {note} </div>
          <div className="lineSound"> {} </div>
        </div>
      ))}
    </div>
  );
};
export default SonsTabela;
