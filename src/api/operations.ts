import axios from 'axios';

import { API_BASE_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

const API_OPERATIONS = 'operations/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getAllOperations = (cookies: string) => {
  return axios.get(constructUrl(API_OPERATIONS), getAxiosConfig(cookies));
};

export const createOperation = (
  name: string,
  estimatedTime: number = 30,
  estimatedTimeUnit: string = 'minutes',
  cookies: string,
) => {
  return axios.post(
    constructUrl(API_OPERATIONS),
    { name, estimatedTime, estimatedTimeUnit },
    getAxiosConfig(cookies),
  );
};

export const getOperation = (operationId: number, cookies: string) => {
  return axios.get(constructUrl(`${API_OPERATIONS}${operationId}/`), getAxiosConfig(cookies));
};

export const updateOperation = (
  operationId: number,
  name: string,
  estimatedTime: number,
  estimatedTimeUnit: string,
  cookies: string,
) => {
  return axios.patch(
    constructUrl(`${API_OPERATIONS}${operationId}/`),
    { name, estimatedTime, estimatedTimeUnit },
    getAxiosConfig(cookies),
  );
};
