import axios from "axios";
import { API_BASE_URL } from "../config";

const BASE_URL: string = API_BASE_URL;
const API_STATUS_DATA = "api/connector/status/";
const API_CONNECTIONS = "api/connector/connections/";
const API_GET_CONNECTIONS = "api/order/get-connections/";
const API_SETTINGS_DATA_SOURCE = "settings/data-source";

const createAxiosConfig = (token: string) => ({
  headers: {
    Authorization: token,
    "ngrok-skip-browser-warning": "true",
  },
});

const constructUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const getStatusData = (hostname: string, cookies: string) => {
  return axios.get(constructUrl(API_STATUS_DATA), createAxiosConfig(cookies));
};

export const patchStatusData = (id: number, cookies: string, body: any) => {
  return axios.put(
    constructUrl(`${API_CONNECTIONS}${id}/`),
    body,
    createAxiosConfig(cookies)
  );
};

export const getConnectionsToDatabases = (
  cookies: string
) => {
  return axios.get(constructUrl(API_GET_CONNECTIONS), createAxiosConfig(cookies));
};

export const updateDataSource = async (token: string, source: string) => {
  try {
    const response = await axios.post(
      constructUrl(API_SETTINGS_DATA_SOURCE),
      { source },
      createAxiosConfig(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error updating data source:", error);
    throw error;
  }
};
