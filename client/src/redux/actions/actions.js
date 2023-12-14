import axios from "axios";
import {
  SET_USER_DATA_REGISTER,
  CREATE_NEW_USER,
  GET_ONLINE,
  GET_ALL_USERS,
  ERROR_GETTING_USERS,
  GET_USER_BY_USERNAME,
  GET_MY_USER,
  SET_USER_DATA_GOOGLE_ACCOUNT,
  CLEAR_USER_DATA_IN_LOGOUT,
  EDIT_USER,
  GET_FRIENDS,
  CHANGE_USER,
  SELECT_REPORT,
  CREATE_ROOM,
  GET_REPORTED,
  UPDATE_USER_LANGUAGE,
  UPDATE_USER_READ_LANGUAGE,
  SET_VIP,
  ADD_ROOM,
  SET_EDIT_PROFILE,
  DELETE_ROOM,
GET_VIPS,
POST_VISITS,
GET_VISITS,
GET_RATING,
RATED,
} from "../action_types/userActionTypes";

import { API_URL } from "../../firebase-config";

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${API_URL}/users`);
      if (data) {
        dispatch({ type: GET_ALL_USERS, payload: data });
      } else {
        throw new Error("Error fetching all users");
      }
    } catch (error) {
      dispatch({ type: ERROR_GETTING_USERS, payload: error.message });
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

export const setUserDataGoogleAccount = (googleData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_USER_DATA_GOOGLE_ACCOUNT,
        payload: googleData,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const clearUserDataInLogout = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: CLEAR_USER_DATA_IN_LOGOUT,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const setVip = (value) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_VIP,
        payload: value,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const addRoom = (room) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: ADD_ROOM,
        payload: room,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const setEditProfile = (values) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: SET_EDIT_PROFILE,
        payload: values,
      });
    } catch (error) {
      throw Error(error);
    }
  };
};

export const createNewUser = (userData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${API_URL}/createuser`, userData);
      dispatch({
        type: CREATE_NEW_USER,
        payload: response,
      });
      
    } catch (error) {
      throw Error(error);
    }
  };
};

export const getOnline = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/getonline`);
    if (data) {
      dispatch({ type: GET_ONLINE, payload: data });
    }
  } catch (error) {
    throw Error(error);
  }
};

export const getUserByUserName = (user) => async (dispatch) => {
  try {
    const { data } = await axios(`${API_URL}/user?user=${user}`);
    

    dispatch({
      type: GET_USER_BY_USERNAME,
      payload: data,
    });
  } catch (error) {
    window.alert("No users with the provided ID");
  }
};
export const getMyUser = (uid) => async (dispatch) => {
  try {
    const myUid = { uid: uid };
    
    const { data } = await axios.post(`${API_URL}/user`, myUid);
    localStorage.setItem("language", data.language);
    localStorage.setItem("languageRead", data.languageRead);
    
    dispatch({
      type: GET_MY_USER,
      payload: data,
    });
  } catch (error) {
    throw Error(error);
  }
};

export const updateUserLanguage = async ({ uid, language }) => {
  try {
    await axios.put(`${API_URL}/language`, { uid, language });
    localStorage.setItem("language", language);
    return async function (dispatch) {
      try {
        dispatch({
          type: UPDATE_USER_LANGUAGE,
          payload: language,
        });
      } catch (error) {
        throw Error(error);
      }
    };
  } catch (error) {
    throw Error(error);
  }
};

export const updateUserReadLanguage = async ({ uid, languageRead }) => {
  try {
    await axios.put(`${API_URL}/languageRead`, { uid, languageRead });
    localStorage.setItem("languageRead", languageRead);
    return async function (dispatch) {
      try {
        dispatch({
          type: UPDATE_USER_READ_LANGUAGE,
          payload: languageRead,
        });
      } catch (error) {
        throw Error(error);
      }
    };
  } catch (error) {
    throw Error(error);
  }
};

export const editUser =
  ({ uid, name, lastname, description }) =>
  async () => {
    try {
      axios.put(`${API_URL}/edit`, { uid, name, lastname, description });
    } catch (error) {
      throw Error(error);
    }
  };

export const handleUser =
  ({ uid, friendId }, action) =>
  async () => {
    try {
      axios.put(`${API_URL}/friend`, { uid, friendId, action });
    } catch (error) {
      throw Error(error);
    }
  };

export const getFriends = (uid) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/friends?uid=${uid}`);
    dispatch({
      type: GET_FRIENDS,
      payload: data,
    });
  } catch (error) {
    throw Error(error);
  }
};

export const chatReducer = (id) => (dispatch) => {
  dispatch({
    type: CHANGE_USER,
    payload: id,
  });
};

export const submitReport = (reportData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/reports`, reportData);
      
      dispatch({
        type: SELECT_REPORT,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error submitting report", error);
    }
  };
};

export const CreateRoom = (obj) => async (dispatch) => {
 
  await axios.post(`${API_URL}/createRoom`, obj);
  dispatch({
    type: CREATE_ROOM,
    payload: obj
  })
}

export const getReported = ()=>async(dispatch)=>{
  try{
      const {data} = await axios.get(`${API_URL}/reported`)
      dispatch({
        type: GET_REPORTED,
        payload: data
      })
    }catch(error){
      throw Error(error)
    }
}

export const deleteReport = (messageId, uid) => async () => {
  try {
    const request = {
      data: { uid, messageId } 
    };

    await axios.delete(`${API_URL}/report`, request);
  } catch (error) {
    throw new Error(error);
  }
};

export const banUser = (uid)=>async()=>{
  try {
    const request = {
      uid,
      action: "ban"
    }
    await axios.post(`${API_URL}/ban`, request)
  } catch (error) {
    throw Error(error)
  }
}

export const getVips = ()=>async(dispatch)=>{
  try {
     const {data} = await axios(`${API_URL}/vips`)
     dispatch({
      type: GET_VIPS,
      payload: data
     }) 
  } catch (error) {
    throw Error(error)
  }
}
export const putDeleteRoom = (obj) => async (dispatch) => {
  const { data } = await axios.put(`${API_URL}/deleteRoom`, obj);
  dispatch({
    type: DELETE_ROOM,
    payload: obj.room,
  });
};

export const postUserVisiting = (userData) => async (dispatch)=>{
  try {
    const {data} = axios.post(`${API_URL}/profile`,userData)
    

  dispatch({
    type: POST_VISITS,
    payload: data
  })
  } catch (error) {
    window.alert(`error when posting visits(redux): ${error}`)
  }
}

export const getVisitors = (uid) => async (dispatch)=>{
  try {
    
    const {data} = await axios(`${API_URL}/user/visitingusers?uid=${uid}`)
  

    dispatch({
      type: GET_VISITS,
      payload: data,
    })
  } catch (error) {
    window.alert(`error when getting visitors(redux) ${error}`)
  }
}

export const getRating = ()=>async(dispatch)=>{
  try {
    const {data} = await axios.get(`${API_URL}/rating`)
    dispatch({
      type: GET_RATING,
      payload: data
    })
  } catch (error) {
    throw Error(error)
  }}
export const rated = (userRated)=> async (dispatch)=>{
  try {
    const {data} = await axios.post(`${API_URL}/rate`, userRated)
    

    dispatch({
      type: RATED,
      payload: data
    })
  } catch (error) {
    window.alert(`error when rating ${error}`)
  }
}