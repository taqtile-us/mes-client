import axios from 'axios';

import { API_BASE_URL } from '../../config';
import { getAxiosConfig } from '../../utils/getAxiosConfig';

const API_DIRECTORY = 'references/';
const API_STATIC_DIRECTORY = 'references/static/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getAllDirectories = (cookies: string) => {
  return axios.get(constructUrl(API_DIRECTORY), getAxiosConfig(cookies));
};

export const getAllStaticDirectories = (cookies: string) => {
  return axios.get(constructUrl(API_STATIC_DIRECTORY), getAxiosConfig(cookies));
};

export const createDirectory = (name: string, cookies: string) => {
  return axios.post(constructUrl(API_DIRECTORY), { name }, getAxiosConfig(cookies));
};

export const getDirectory = (directoryId: number, cookies: string) => {
  return axios.get(constructUrl(`${API_DIRECTORY}${directoryId}/`), getAxiosConfig(cookies));
};

export const updateDirectory = (directoryId: number, name: string, cookies: string) => {
  return axios.patch(
    constructUrl(`${API_DIRECTORY}${directoryId}/`),
    { name },
    getAxiosConfig(cookies),
  );
};

export const deleteDirectory = (directoryId: number, cookies: string) => {
  return axios.delete(constructUrl(`${API_DIRECTORY}${directoryId}/`), getAxiosConfig(cookies));
};
