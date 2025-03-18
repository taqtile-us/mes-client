import axios from 'axios';

import { API_DJANGO_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

const API_CAMERASELECT = 'api/camera-algorithms/camera/';
const API_CAMERACREATE = 'api/cameras/create-camera/';
const API_CAMERADELETE = 'api/camera-algorithms/delete-camera/';
const API_CAMERAFIND = 'api/core/find_cameras/';
const API_CAMERACHECK = 'api/cam-stream/cameras/verification';
const API_CAMERAZONES = 'api/camera-algorithms/zone-cameras/';
const API_ZONES = 'api/camera-algorithms/zone/';
const API_ALGORITHMZONES = 'api/camera-algorithms/zones-algorithms/';
const API_VIDEO = 'api/cam-stream/videos/availability';

export const getSelectedCameras = (hostname, cookies) => {
  return axios.get(`${API_DJANGO_URL}${API_CAMERASELECT}`, getAxiosConfig(cookies));
};

export const postCamera = (hostname, IPCamera, username, password, cookies) => {
  return axios.post(
    `${API_DJANGO_URL}${API_CAMERACREATE}`,
    {
      ip: IPCamera,
      username: username,
      password: password,
      url: 'http://192.168.1.110',
    },
    getAxiosConfig(cookies),
  );
};

export const deleteCameraAPI = (hostname, cookies, IPCamera) => {
  return axios.delete(`${API_DJANGO_URL}${API_CAMERADELETE}${IPCamera}/`, getAxiosConfig(cookies));
};

export const findCamera = () => {
  return axios.get(API_DJANGO_URL + API_CAMERAFIND, getAxiosConfig());
};

export const checkCamera = (hostname, cameraIP, username, password) => {
  return fetch(`${API_DJANGO_URL}${API_CAMERACHECK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify({
      ip: cameraIP,
      username: username,
      password: password,
    }),
  });
};

export const getCameraZones = (hostname, cookies, camera) => {
  return axios.get(`${API_DJANGO_URL}${API_CAMERAZONES}?camera=${camera}`, getAxiosConfig(cookies));
};

export const postCameraZones = (hostname, cookies, body) => {
  return axios.post(`${API_DJANGO_URL}${API_ZONES}`, body, getAxiosConfig(cookies));
};

export const patchCameraZones = (hostname, cookies, response, id) => {
  return axios.put(`${API_DJANGO_URL}${API_ZONES}${id}/`, response, getAxiosConfig(cookies));
};

export const deleteCameraZones = (hostname, cookies, id) => {
  return axios.delete(`${API_DJANGO_URL}${API_ZONES}${id}/`, getAxiosConfig(cookies));
};

export const getAlgorithmZones = (hostname, cookies, camera) => {
  return axios.get(
    `${API_DJANGO_URL}${API_ALGORITHMZONES}?camera=${camera}`,
    getAxiosConfig(cookies),
  );
};

export const getVideo = (hostname, body) => {
  const { time, camera_ip } = body;
  return axios.get(
    `${API_DJANGO_URL}${API_VIDEO}?time=${time}&cameraIp=${camera_ip}`,
    getAxiosConfig(),
  );
};

export const getSelectedZone = (hostname, cookies, id) => {
  return axios.get(`${API_DJANGO_URL}${API_ZONES}${id}/`, getAxiosConfig(cookies));
};
