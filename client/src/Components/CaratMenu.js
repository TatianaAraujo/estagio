import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

const AdesaoMenu = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/FichaDoDoente/Monitorizacao/Carat/CaratTotal");
  }, []);

  const buttonUp = (buttonId) => {
    let button = document.getElementById(buttonId);
    button.style.border = "4px solid #175874";
  };

  const buttonDown = (buttonId) => {
    let button = document.getElementById(buttonId);
    button.style.border = "1px solid #707070";
  };

  const clickCaratTotal = () => {
    buttonDown("caratVAI");
    buttonDown("caratVAS");
    buttonUp("caratTotal");
    history.push("/FichaDoDoente/Monitorizacao/Carat/CaratTotal");
  };

  const clickCaratVAI = () => {
    buttonDown("caratVAS");
    buttonDown("caratTotal");
    buttonUp("caratVAI");
    history.push("/FichaDoDoente/Monitorizacao/Carat/CaratVAI");
  };

  const clickCaratVAS = () => {
    buttonDown("caratTotal");
    buttonDown("caratVAI");
    buttonUp("caratVAS");
    history.push("/FichaDoDoente/Monitorizacao/Carat/CaratVAS");
  };
  return (
    <div className="menuCarat">
      <div
        className="buttonBigCarat"
        id="caratTotal"
        style={{ border: "4px solid #175874" }}
        onClick={() => {
          clickCaratTotal();
        }}
      >
        CARAT Total
      </div>
      <div
        className="buttonBigCarat"
        id="caratVAI"
        onClick={() => {
          clickCaratVAI();
        }}
      >
        CARAT VAI
      </div>
      <div
        className="buttonBigCarat"
        id="caratVAS"
        onClick={() => {
          clickCaratVAS();
        }}
      >
        CARAT VAS
      </div>
    </div>
  );
};
export default AdesaoMenu;
