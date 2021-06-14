import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getId } from "../actions/fichaDoDoente";

const Patient = ({ PatientList }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return PatientList.map(({ id, name, gender, birthDate }, index) => {
    if (gender === "male") gender = "M";
    else gender = "F";

    const sendToLocalStorage = (id) => {
      localStorage.setItem("patientId", id);
    };

    return (
      <div className="patient" key={index}>
        <table
          onClick={() => {
            sendToLocalStorage(id);
            dispatch(getId(id));
            history.push("/FichaDoDoente");
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: "30px" }}> </td>
              <td style={{ width: "100px" }}> {id} </td>
              <td style={{ width: "300px" }}> {name} </td>
              <td style={{ width: "200px" }}> {birthDate} </td>
              <td> {gender} </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  });
};

Patient.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  birthDate: PropTypes.string,
};

export default Patient;
