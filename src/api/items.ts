import axios from 'axios';

import { API_BASE_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

const API_ITEMS = 'items/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getAllItems = (cookies: string) => {
  return axios.get(constructUrl(API_ITEMS), getAxiosConfig(cookies));
};

export const createItem = (name: string, cookies: string) => {
  return axios.post(constructUrl(API_ITEMS), { name }, getAxiosConfig(cookies));
};

export const getItem = (itemId: number, cookies: string) => {
  return axios.get(constructUrl(`${API_ITEMS}${itemId}/`), getAxiosConfig(cookies));
};

export const updateItem = (itemId: number, name: string, cookies: string) => {
  return axios.patch(constructUrl(`${API_ITEMS}${itemId}/`), { name }, getAxiosConfig(cookies));
};
