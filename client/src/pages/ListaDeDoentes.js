import React, { useState, useEffect } from "react";
import Patient from "../Components/Patient";

const Lista = () => {
  useEffect(() => {
    addBodyClass("body-transparent");
    removeBodyClass("body");
  }, []);
  const addBodyClass = (className) => document.body.classList.add(className);
  const removeBodyClass = (className) =>
    document.body.classList.remove(className);

  const [PatientList, setPatientList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [PatientListShow] = useState(true);
  const [PatientsName, setPatientsName] = useState("");

  const searchPatientNames = (name) => {
    fetch(`/patient?name=${name}`, {
      accept: "application/json",
    })
      .then((response) => response.json())
      .then((patients) => {
        setPatientList(patients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="fixedDiv">
        <p className="listTitleText">LISTA DE DOENTES</p>

        <input
          className="inputPatients"
          type="search"
          id="input"
          onClick={() => {
            const input = document.getElementById("input");
            input.style.backgroundColor = "#e0faf8";
          }}
          onChange={(e) => {
            setPatientsName(e.target.value);
            searchPatientNames(PatientsName);
            const list = document.getElementById("list");
            list.style.display = "flex";
          }}
        />
      </div>

      <div className="listaPatientsDiv" id="list" style={{ display: "none" }}>
        <div className="listaPatientsTable">
          <table>
            <tbody>
              <tr>
                <th style={{ width: "35%" }}>SNS</th>
                <th style={{ width: "300px" }}>| Nome Utente </th>
                <th style={{ width: "200px" }}>| Data Nascimento </th>
                <th>| Sexo </th>
              </tr>
            </tbody>
          </table>
          <div>
            {!Loading && PatientListShow && (
              <Patient PatientList={PatientList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lista;
