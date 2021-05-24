import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  useEffect(() => {
    addBodyClass("body");
    removeBodyClass("body-transparent");
  }, []);
  const addBodyClass = (className) => document.body.classList.add(className);
  const removeBodyClass = (className) =>
    document.body.classList.remove(className);

  return (
    <div>
      <div className="titleDiv">
        <div className="titleText"> Portal Clínico </div>
      </div>

      <div className="loginDiv">
        <div className="loginDivForm">
          <p className="textLoginForm"> Utilizador:</p>
          <input type="text" className="formLogin" />
          <p className="textLoginForm"> Password: </p>
          <input type="password" className="formLogin" />
          <p className="textLoginForm" style={{ fontSize: "20px" }}>
            {" "}
            Esqueceu-se da password?{" "}
          </p>
          <button
            className="loginButton"
            onClick={() => {
              removeBodyClass("body");
              addBodyClass("body-transparent");
              history.push("/ListaDeDoentes");
            }}
          >
            {" "}
            Entrar{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
