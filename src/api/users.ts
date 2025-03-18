import axios from 'axios';

import { IAddUser, IUpdateUser } from '../models/interfaces/employee.interface';
import { API_BASE_URL } from '../config';
import { getAxiosConfig } from '../utils/getAxiosConfig';

// const API_PATHS = {
//   ODOO_USERLIST: "employees/",
//   DEFAULT_USERLIST: "api/employees/",
//   ODOO_USERINFO: "auth/odoo/user-info/",
//   DEFAULT_USERINFO: "api/employees/get-user-info/",
//   ODOO_USER_ADD: "", // need implement
//   DEFAULT_USER_ADD: "api/employees/create/",
//   ODOO_WORKPLACES: "", // need implement
//   DEFAULT_WORKPLACES: "api/employees/workplaces/",
// };

const API_USER_LIST = 'employees/';
const API_USER_INFO = 'auth/odoo/django/api/employees/get-user-info/';
const API_USER_ADD = 'auth/odoo/django/api/employees/create/';
const API_WORKPLACES = 'auth/odoo/django/api/employees/workplaces/';

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const getUserList = (cookies: string) => {
  return axios.get(constructUrl(`${API_USER_LIST}`), getAxiosConfig(cookies));
};

export const getCurrentUserInfo = (cookies: string) => {
  return axios.get(constructUrl(`${API_USER_INFO}`), getAxiosConfig(cookies));
};

export const getUser = (id: number, cookies: string) => {
  return axios.get(constructUrl(`${API_USER_LIST}${id}/`), getAxiosConfig(cookies));
};

export const deleteUser = (id: number, cookies: string) => {
  return axios.delete(constructUrl(`${API_USER_LIST}${id}/`), getAxiosConfig(cookies));
};

export const updateUser = (id: number, user: IUpdateUser, cookies: string) => {
  return axios.patch(constructUrl(`${API_USER_LIST}${id}/`), user, getAxiosConfig(cookies));
};

export const createUser = (user: IAddUser, cookies: string) => {
  return axios.post(constructUrl(`${API_USER_ADD}`), user, getAxiosConfig(cookies));
};

export const getWorkplaces = (cookies: string) => {
  return axios.get(constructUrl(`${API_WORKPLACES}`), getAxiosConfig(cookies));
};
