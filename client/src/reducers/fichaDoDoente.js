import { GET_ID, GET_MEDICATION_NAME } from "../actions";

const INICIAL_STATE = { id: "" };
const fichaDoDoente = (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case GET_ID:
      return {
        ...state,
        id: action.id,
      };
    case GET_MEDICATION_NAME:
      return {
        ...state,
        teste: state?.nome,
        nome: [action.nome],
      };
    default:
      return state;
  }
};
export default fichaDoDoente;
