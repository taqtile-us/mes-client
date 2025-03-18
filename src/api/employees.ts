import axios from "axios";

import { API_BASE_URL } from "../config";
import { getAxiosConfig } from "../utils/getAxiosConfig";

const API_EMPLOYEES = "employees/";

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getAllEmployees = (cookies: string) => {
  return axios.get(constructUrl(API_EMPLOYEES), getAxiosConfig(cookies));
};

export const getEmployee = (employeeId: number, cookies: string) => {
  return axios.get(constructUrl(`${API_EMPLOYEES}${employeeId}/`), getAxiosConfig(cookies));
};
