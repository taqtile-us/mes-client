import axios from "axios";

import { API_BASE_URL } from "../config";
import { getAxiosConfig } from "../utils/getAxiosConfig";

const API_SCANNER = "order-operations/qr-code/";

export const createOrderFromQr = (body: unknown, cookies: string) => {
  return axios.post(`${API_BASE_URL}${API_SCANNER}`, body, getAxiosConfig(cookies)).catch(error => {
    throw error;
  });
};
