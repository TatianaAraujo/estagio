import { GET_ID, GET_MEDICATION_NAME } from "./index";

export const getId = (id) => ({
  type: GET_ID,
  id,
});

export const getMedicationName = (nome) => ({
  type: GET_MEDICATION_NAME,
  nome,
});
