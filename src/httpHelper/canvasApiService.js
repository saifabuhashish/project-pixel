import axios from "../api/axios";

// const token = localStorage.getItem("accessToken")
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmQ2MzgxOWUzYjg1MThjNjI1MDhmNzgiLCJpYXQiOjE2NTgyNTIxMjEsImV4cCI6MTY1ODI1MzkyMSwidHlwZSI6ImFjY2VzcyJ9.GeRVFyh_5inNI-E5DWN0NxjBQINZ-D5bIsRomzvRdAE";
const headerWithToken = {
  //   "Content-Type": "application/json",
  //   Accept: "*/*",
  authorization: token ? `Bearer ${token}` : "",
};

export function getCanvasPixels(canvasId) {
  return axios
    .get(`/v1/pixels/${canvasId}`, { headers: headerWithToken })
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
