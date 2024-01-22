import axios from "axios";
import { errorToast } from "../component/Toasts/Toasts";
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

// POST Requests...
export const userRegistration = async (newUserInfo) => {
  try {
    const response = await api.post("/customer", newUserInfo);
    return response;
  } catch (error) {
    errorToast(error.response.data.errorMessage);
    return false;
  }
};

export const userLogin = async (loginInfo, productType) => {
  try {
    const response = await api.post(`/login/${productType}`, loginInfo);
    return response;
  } catch (error) {
    if(error.response.data.errorMessage){
      errorToast(error.response.data.errorMessage);
    }
    else{
      errorToast("Something went wrong.");
    }
    return false;
  }
};

export const userVerification = async (data) => {
  try {
    const response = await api.post("/otp/verify", data);
    return response;
  } catch (error) {
    errorToast(error.response.data.errorMessage);
    return false;
  }
};



export const resendOtpReference = async (data) => {
  try{
    const response = await api.post("otp/resend",data);
    return response;
  } catch (error) {
    errorToast("Internal Server Error");
    return false;
  }
};

export const adminLogin = async (loginInfo, productType) => {
  try {
    const response = await api.post(`/login/${productType}`, loginInfo);
    return response;
  } catch (error) {
    errorToast(error.response.data.errorMessage)
    return false;
    
  }
};
