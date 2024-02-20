import axios from "axios";

//apply base url for axios
const API_URL = "https://sms.unitch.in/api/index.php/v1";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// Get locally stored value of key accesstoken
const token = "Bearer " + localStorage.getItem("temptoken");

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function getCompleteResponse(url, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");

  return await axiosApi.get(url, { ...config }).then((response) => {
    return {
      data: response.data,
      headers: response.headers,
    };
  });
}

export async function getResponse(url, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");

  return await axiosApi.get(url, { ...config }).then((response) => {
    return {
      data: response.data,
      headers: response.headers,
    };
  });
}

export async function postCompleteResponse(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");

  return await axiosApi.post(url, data, { ...config }).then((response) => {
    return {
      data: response.data,
      headers: response.headers,
    };
  });
}

export async function get(url, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] =
    import.meta.env.VITE_APP_AUTHKEY;

  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] =
    import.meta.env.VITE_APP_AUTHKEY;
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] = "";
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] = "";
  axiosApi.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("temptoken");

  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
