import React from "react";
import { useSelector } from "react-redux";

const MedicationName = () => {
  const name = useSelector((state) => state);
  console.log(name);
  //console.log(name);
  //name.map((a) => console.log(a));
  //const [medicationName, setMedicationName] = useState("");

  return <p>oll</p>;
};

export default MedicationName;
