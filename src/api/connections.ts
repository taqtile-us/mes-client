import axios from 'axios';

import { API_BASE_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

const API_STATUS_DATA = 'auth/odoo/django/api/connector/status/';
const API_CONNECTIONS = 'auth/odoo/django/api/connector/connections/';
const API_GET_CONNECTIONS = 'auth/odoo/django/api/order/get-connections/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getStatusData = (hostname: string, cookies: string) => {
  return axios.get(constructUrl(API_STATUS_DATA), getAxiosConfig(cookies));
};

export const patchStatusData = (id: number, cookies: string, body: unknown) => {
  return axios.put(constructUrl(`${API_CONNECTIONS}${id}/`), body, getAxiosConfig(cookies));
};

export const getConnectionsToDatabases = (cookies: string) => {
  return axios.get(constructUrl(API_GET_CONNECTIONS), getAxiosConfig(cookies));
};
