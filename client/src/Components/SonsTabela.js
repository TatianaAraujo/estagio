import React, { useState } from "react";
import play from "../img/botao-play-ponta-de-seta.png";
import pause from "../img/pause.png";

const SonsTabela = (props) => {
  const { sons } = props;
  let newSons = sons.filter((sons) => sons.showItem > 0);
  const [playButtonIndex, setPlayButtonIndex] = useState("none");
  const [audio, setAudio] = useState({ pause: () => {} });

  for (let i = 0; i < newSons.length; i++) {
    if (newSons[i].type == "Lung Function") {
      newSons[i].type = "Função pulmonar";
    } else if (newSons[i].type.includes("Auscultation")) {
      newSons[i].type = "Auscultação";
    } else if (newSons[i].type == "Free Recording") {
      newSons[i].type = "Gravação livre";
    }
  }

  const playSound = (contentData, e) => {
    const index = e.target.id.slice(-1);
    const playing = document.getElementById(`playing${playButtonIndex}`);
    const pause = document.getElementById(`pause${index}`);

    if (playing === null) {
      e.target.id = `playing${index}`;
      e.target.style.display = "none";
      pause.style.display = "flex";
      setPlayButtonIndex(index);
      const a = new Audio("data:audio/wav;base64," + contentData);
      setAudio(a);
      a.play();
    } else {
      const pausePlaying = document.getElementById(`pause${playButtonIndex}`);
      audio.pause();
      pausePlaying.style.display = "none";
      playing.style.display = "flex";
      playing.id = `play${playButtonIndex}`;

      e.target.id = `playing${index}`;
      e.target.style.display = "none";
      pause.style.display = "flex";
      setPlayButtonIndex(index);
      const a = new Audio("data:audio/wav;base64," + contentData);
      setAudio(a);
      a.play();
    }
    return;
  };

  const pauseSound = (e) => {
    const index = e.target.id.slice(-1);
    const play = document.getElementById(`playing${index}`);
    e.target.style.display = "none";
    play.style.display = "flex";
    play.id = `play${index}`;
    setPlayButtonIndex("none");
    audio.pause();
  };

  return (
    <div className="sonsInfo">
      {newSons.map(({ contentData, createdDateTime, type, note }, index) => (
        <div className="tableSounds" key={index}>
          <div className="lineSound" style={{ width: "5%", cursor: "pointer" }}>
            <img
              style={{ display: "flex" }}
              id={`play${index}`}
              width="40%"
              src={play}
              alt=""
              onClick={(e) => {
                playSound(contentData, e);
              }}
            />
            <img
              style={{ display: "none" }}
              id={`pause${index}`}
              width="40%"
              src={pause}
              alt=""
              onClick={(e) => {
                pauseSound(e);
              }}
            />
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
