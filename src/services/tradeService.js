import axios from "axios";
import store from "../redux";
import { errorToast } from "../component/Toasts/Toasts";



const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
    const token = store.getState().auth.token;
  
    token && (req.headers.Authorization = `Bearer ${token}`);
    return req;
  });

  export const fetchTradeList = async (limit,offset) => {
    try {
      const response = await api.get(`/trades?limit=${limit}&offset=${offset}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  export const modifyTradeStatus = async (id, type) => {
    try {
      const response = await api.post(`/trade/${id}/${type}`);
      return response;
    } catch (error) {
      return error;
    }
  };
  // POST Requests...
  export const tradeSetup = async (data) => {
  try {
    const response = await api.post("/trade", data);
    return response;
  } catch (error) {
    errorToast(error.response.data.errorMessage);
    return error;
  }
};
export const deleteTradesetup = async (id) => {
  try {
    const response = await api.delete(`/trade/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (er) {
    if (er.response) {
      if (er.response.status === 401) {
        window.location.href = "/app/logout";
      }
    }

    return Promise.reject(er);
  }
);