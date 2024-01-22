import axios from "axios";
import store from "../redux";
import { useState,useEffect } from "react";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

api.interceptors.request.use((req) => {
  let token = store.getState().auth.token;
  if(token==null) {
    token = store.getState().auth.adminToken;
  }

  token && (req.headers.Authorization = `Bearer ${token}`);
  return req;
});

// api.interceptors.request.use((req) => {
//   const token = store.getState().auth.adminToken;

//   token && (req.headers.Authorization = `Bearer ${token}`);
//   return req;
// });
 



        


// GET Requests



export const fetchStrategyDetails = async (limit, offset) => {
  try {
    const response = await api.get(
      `/strategy/all`
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const getStrategyScript = async (id) => {
  try {
    const response = await api.get(`/strategy/${id}`);
    return response;
  }
  catch(error)
  {
    return error;
  }
}

 

export const fetchStrategyAll = async (limit,offset,strategyname,strategystatus,createdonstartdate,createdonenddate) => {
  try {
    const response = await api.get(`/strategies?limit=${limit}&offset=${offset}&name=${strategyname}&status=${strategystatus}&from=${createdonstartdate}&to=${createdonenddate}`);
    return response;
  } catch (error) {
    return error;
  }
};

 

// post Request

export const modifyStrategyStatus = async (id, type) => {
  try {
    const response = await api.post(`/strategy/${id}/${type}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteStrategy= async (id) => {
  try {
    const response = await api.delete(`/strategy/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const saveStrategy = async (data) => {
  try {
    const response = await api.post("/strategy", data);
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
