import axios from "axios";
import store from "../redux";
import { errorToast } from "../component/Toasts/Toasts";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
  const token = store.getState().auth.token;

  token && (req.headers.Authorization = `Bearer ${token}`);
  return req;
});

export const placeSubscription = async (data) => {
    try {
      const response = await api.post("/subscription/transaction", data);
      return response;
    } catch (error) {
      errorToast("Something went wrong");
      return false;
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
