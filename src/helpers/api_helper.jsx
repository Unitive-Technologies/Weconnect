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
  console.log("url:" + url);
  axiosApi.defaults.headers.common["Authkey"] = import.meta.env.VITE_APP_AUTHKEY;

  return await axiosApi
    .get(url, { ...config })
    .then((response) => response);
}

export async function get(url, config = {}) {
  console.log("url:" + url);
  axiosApi.defaults.headers.common["Authkey"] = import.meta.env.VITE_APP_AUTHKEY;

  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}
// .json().then(json=>{headers: response.headers, status: response.status, json})
// export async function get(url, config = {}) {
//   console.log("url:" + url);
//   axiosApi.defaults.headers.common["Authkey"] = "";

//   return axiosApi.get(url, { ...config }).then(async (response) => {
//     const totalCount = response.headers["x-pagination-total-count"];
//     console.log("X-Pagination-Total-Count:", totalCount);

//     if (totalCount) {
//       return await axiosApi.get(url, {
//         ...config,
//         params: { "per-page": parseInt(totalCount) },
//       });
//     } else console.log("apiHelper response:" + JSON.stringify(response.data));

//     return response.data;
//   });
// }

export async function post(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] =
    import.meta.env.VITE_APP_AUTHKEY;
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] = "";

  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  axiosApi.defaults.headers.common["Authkey"] = "";

  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
