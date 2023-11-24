import axios from "axios";
import {
  GET_ALL_USERS,
  ERROR_GETTING_USERS,
} from "../action_types/ACTION_TYPES";

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/users");

      // Verificar que la propiedad "success" sea true
      if (response.data.success) {
        const users = response.data.users;
        dispatch({ type: GET_ALL_USERS, payload: users });
      } else {
        // Enviar un mensaje de error si "success" es false
        throw new Error("Error fetching users");
      }
    } catch (error) {
      dispatch({ type: ERROR_GETTING_USERS, payload: error.message });
    }
  };
};
