import axios from "../api/axios";

export function registerUser(data) {
  return axios
    .post(`/v1/auth/register`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function loginUser(data) {
  return axios
    .post(`/v1/auth/login`, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
