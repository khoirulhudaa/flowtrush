import axios from "axios";
import store from "../store/store";

const api = axios.create({
  baseURL: 'http://localhost:3600',
  headers: {
    "Content-Type": "application/json",
  }    
});

api.interceptors.request.use(async function (config) {

  const token = store.getState().authSlice.token;

  if (token) {
    config.headers["Authorization"] = token;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  
  return config;

}, function (error) {

  return Promise.reject(error);

});

api.interceptors.response.use(function (response) {
  
  return response

}, function (error) {
  if (error.response.data.message === "jwt expired" || error.response.data.message === "You don't have access permissions." || error.response.status === 404 || error) {
      window.location.pathname = '/auth'
  }

  return Promise.reject(error);

});

export default api;
