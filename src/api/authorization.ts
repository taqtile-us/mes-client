import axios from 'axios';

import { API_BASE_URL } from '../config';

const API_AUTH = 'auth/odoo/login/';
const API_VERIFY_TOKEN = 'auth/odoo/django/api/auth/jwt/verify/';
const API_REQUEST_RESET_PASSWORD = 'auth/odoo/django/api/employees/password-reset/';
const API_VERIFY_CODE = 'auth/odoo/django/api/employees/verify-reset-code/';
const API_RESET_PASSWORD = 'auth/odoo/django/api/employees/set-new-password/';

export const authorizationRequest = async <T>(email: string, password: string): Promise<T> => {
  const response = await axios.post<T>(`${API_BASE_URL}${API_AUTH}`, {
    username: email,
    password: password,
  });

  return response.data;
};

export const isVerifyToken = (cookies: string) => {
  cookies = cookies?.split(' ')[1];
  return axios.post(`${API_BASE_URL}${API_VERIFY_TOKEN}`, {
    token: cookies,
    'ngrok-skip-browser-warning': 'true',
  });
};

export const requestResetPassword = (email: string, lang: string) => {
  return axios.post(`${API_BASE_URL}${API_REQUEST_RESET_PASSWORD}`, {
    email,
    language_code: lang,
  });
};

export const verifyCode = (email: string, code: string) => {
  return axios.post(`${API_BASE_URL}${API_VERIFY_CODE}`, {
    email,
    code,
  });
};

export const resetPassword = (
  email: string,
  code: string,
  newPassword: string,
  confirmPassword: string,
) => {
  return axios.post(`${API_BASE_URL}${API_RESET_PASSWORD}`, {
    email,
    code,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
};
