import axios from 'axios';

import { API_BASE_URL } from '../config';

const REPORT_ORDERS = 'reports/work-hours/orders/';
const REPORT_ORDER_ITEMS = 'reports/work-hours/order-items/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getReport = (cookies: string, startDate: string, endDate: string) => {
  return axios.get(constructUrl(`${REPORT_ORDERS}?startDate=${startDate}&endDate=${endDate}`), {
    headers: {
      Authorization: cookies,
      'ngrok-skip-browser-warning': 'true',
    },
    responseType: 'blob',
  });
};

export const getEmployeeReport = (
  cookies: string,
  startDate: string,
  endDate: string,
  employeeId: string,
) => {
  return axios.get(
    constructUrl(`${REPORT_ORDERS}${employeeId}/?startDate=${startDate}&endDate=${endDate}`),
    {
      headers: {
        Authorization: cookies,
        'ngrok-skip-browser-warning': 'true',
      },
      responseType: 'blob',
    },
  );
};

export const getOrderReport = (
  cookies: string,
  startDate: string,
  endDate: string,
  orderId: string,
) => {
  return axios.get(
    constructUrl(
      `${REPORT_ORDER_ITEMS}?startDate=${startDate}&endDate=${endDate}&orderId=${orderId}`,
    ),
    {
      headers: {
        Authorization: cookies,
        'ngrok-skip-browser-warning': 'true',
      },
      responseType: 'blob',
    },
  );
};

export const getOrderEmployeeReport = (
  cookies: string,
  startDate: string,
  endDate: string,
  orderId: string,
  employeeId: string,
) => {
  return axios.get(
    constructUrl(
      `${REPORT_ORDER_ITEMS}${employeeId}/?startDate=${startDate}&endDate=${endDate}&orderId=${orderId}`,
    ),
    {
      headers: {
        Authorization: cookies,
        'ngrok-skip-browser-warning': 'true',
      },
      responseType: 'blob',
    },
  );
};
