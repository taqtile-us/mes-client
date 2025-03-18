import axios from "axios";

import { API_BASE_URL } from "../config";
import { getAxiosConfig } from "../utils/getAxiosConfig";

const API_OPERATIONS = "auth/odoo/django/api/new-order/operations/";
const API_ORDERLIST = "auth/odoo/django/api/new-order/orders/";
const API_OPERATION = "auth/odoo/django/api/new-order/order-detail/";
const API_WORKPLACE = "auth/odoo/django/api/new-order/whnet-operations/";
const API_FILTRATIONDATA = "auth/odoo/django/api/new-order/filtration-data";

const constructUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;

export const getOrderViewOperations = (cookies: string, startDate: string, endDate: string) => {
  return axios.get(
    constructUrl(`${API_OPERATIONS}?from=${startDate}&to=${endDate}`),
    getAxiosConfig(cookies)
  );
};

export const getOrderViewOrderList = (cookies: string, startDate: string, endDate: string) => {
  return axios.get(
    constructUrl(`${API_ORDERLIST}?from=${startDate}&to=${endDate}`),
    getAxiosConfig(cookies)
  );
};

export const getOrderViewOperation = (cookies: string, id: number) => {
  return axios.get(constructUrl(`${API_OPERATION}?operation=${id}`), getAxiosConfig(cookies));
};

export const getWorkplaceList = (cookies: string) => {
  return axios.get(constructUrl(API_WORKPLACE), getAxiosConfig(cookies));
};

export const getFiltrationData = (cookies: string) => {
  return axios.get(constructUrl(API_FILTRATIONDATA), getAxiosConfig(cookies));
};

export const patchFiltrationData = (cookies: string, body: unknown) => {
  return axios.put(constructUrl(API_FILTRATIONDATA), body, getAxiosConfig(cookies));
};
