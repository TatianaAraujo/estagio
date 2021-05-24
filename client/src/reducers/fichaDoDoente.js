import { GET_ID } from "../actions";

const INICIAL_STATE = { id: "" };
const fichaDoDoente = (state = INICIAL_STATE, action) => {
  switch (action.type) {
    case GET_ID:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};
export default fichaDoDoente;
