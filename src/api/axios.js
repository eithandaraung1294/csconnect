import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

//* posts && comments
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const makeRequest = (url, options) => {
    return api(url, options)
      .then(res => res.data)
      .catch(error => Promise.reject(error?.response?.data?.message ?? "Error"))
}
  