import axios from "../api/axios";

const token = localStorage.getItem("accessToken");
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmQ2MzgxOWUzYjg1MThjNjI1MDhmNzgiLCJpYXQiOjE2NTgzMzU2MDEsImV4cCI6MTY1ODMzNzQwMSwidHlwZSI6ImFjY2VzcyJ9.kX846b1VhNW4QguZuuRad8kT6-iwTD8xopO_7YJNOus";
const headerWithToken = {
  //   "Content-Type": "application/json",
  //   Accept: "*/*",
  authorization: token ? `Bearer ${token}` : "",
};

export function getCanvasPixels(canvasId) {
  return axios
    .get(`/v1/pixels/${canvasId}`, {
      headers: headerWithToken,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function updateCanvasPixels(data) {
  return axios
    .patch(`/v1/pixels`, data, { headers: headerWithToken })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
