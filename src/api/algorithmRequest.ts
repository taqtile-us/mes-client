import axios from 'axios';

import { API_DJANGO_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

const API_ALGORITHM = 'api/camera-algorithms/algorithms-detail/';
const API_POSTALGORITHM = 'api/camera-algorithms/create-process/';
const API_GETPROCESS = 'api/camera-algorithms/get-process/';
const API_POSTOPERATIONID = 'api/order/index_stanowisko/';
const API_UPLOAD = 'api/camera-algorithms/upload-algorithm/';

export const getAveilableAlgorithms = (hostname, cookies) => {
  return axios.get(`${API_DJANGO_URL}${API_ALGORITHM}`, getAxiosConfig(cookies));
};

export const uploadAlgorithm = async (hostname, cookies, id) => {
  return axios.post(`${API_DJANGO_URL}${API_UPLOAD}${id}/`, {}, getAxiosConfig(cookies));
};

export const postAlgorithnDependences = async (hostname, cookies, response) => {
  return axios.post(`${API_DJANGO_URL}${API_POSTALGORITHM}`, response, getAxiosConfig(cookies));
};

export const getProcess = (hostname, cookies) => {
  return axios.get(`${API_DJANGO_URL}${API_GETPROCESS}`, getAxiosConfig(cookies));
};

export const getProcessByCamera = (hostname, cameraIp, cookies) => {
  return axios.get(`${API_DJANGO_URL}${API_GETPROCESS}${cameraIp}/`, getAxiosConfig(cookies));
};

export const getOperationID = (hostname, cookies) => {
  return axios.get(`${API_DJANGO_URL}${API_POSTOPERATIONID}`, getAxiosConfig(cookies));
};

export const postUploadAlgorithm = async (hostname, cookies, body) => {
  return axios.post(`${API_DJANGO_URL}${API_ALGORITHM}`, body, getAxiosConfig(cookies));
};

export const deleteAlgorithmAPI = (hostname, cookies, id) => {
  return axios.delete(`${API_DJANGO_URL}${API_ALGORITHM}${id}/`, getAxiosConfig(cookies));
};

export const putAlgorithmAPI = (cookies, id, body) => {
  return axios.put(`${API_DJANGO_URL}${API_ALGORITHM}${id}/`, body, getAxiosConfig(cookies));
};
