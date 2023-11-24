import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const ERROR_GETTING_USERS = "ERROR_GETTING_USERS";

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
