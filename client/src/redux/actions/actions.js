import axios from "axios";
import {
  SET_USER_DATA_REGISTER,
  SET_USER_DATA_CREATE_PROFILE,
  CREATE_NEW_USER,
  GET_ALL_USERS,
} from "../action_types/userActionTypes";
import { GET_ONLINE } from "../action_types/action-types";

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/users");

      if (response.data.success) {
        const users = response.data.users;
        dispatch({ type: GET_ALL_USERS, payload: users });
      }
    } catch (error) {
      throw Error(error);
    }
  };
};

export const setUserDataRegister = (userData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_REGISTER,
        payload: userData,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const setUserDataCreateProfile = (userData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_CREATE_PROFILE,
        payload: userData,
      });
      console.log(userData);
    } catch (error) {
      throw Error(error);
    }
  };
};

export const createNewUser = (userData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/createuser",
        userData
      );
      dispatch({
        type: CREATE_NEW_USER,
        payload: response,
      });
      console.log(response);
    } catch (error) {
      throw Error(error);
    }
  };
};

export const getOnline = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3001/getonline");
    if (data) {
      dispatch({ type: GET_ONLINE, payload: data });
    }
  } catch (error) {
    throw Error(error);
  }
};
