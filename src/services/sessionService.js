import axios from "axios";
import { errorToast } from "../component/Toasts/Toasts";
import store from "../redux";
import { useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
  const token = store.getState().auth.token;
  token && (req.headers.Authorization = `Bearer ${token}`);
  return req;
});

export const SaveCustomerBroker = async (data, uri) => {
  const navigate = useNavigate();
  try {
    const response = await api.post(uri, data);
    if (response.status === 201) {
      navigate('/onboarding', { replace: true });
    }
   
    return response;
  } catch (error) {
    errorToast("Something went wrong");
    return false;
  }
};

export const userLogout = async () => {
  try {
    await api.post("/logout");
    return true;
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
