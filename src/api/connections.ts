import axios from "axios";
import { API_BASE_URL } from "../config";

const BASE_URL: string = API_BASE_URL;
const API_STATUSDATA = "api/connector/status/";
const API_CONNECTIONS = "api/connector/connections/";
const GET_CONNECTIONS = "api/order/get-connections/";
const SETTINGS_DATA_SOURCE = "settings/data-source";

const axiosConfig = (cookies: string) => ({
  headers: {
    Authorization: cookies,
    "ngrok-skip-browser-warning": "true",
  },
});

const constructUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const getStatusData = (hostname: string, cookies: string) => {
  return axios.get(constructUrl(API_STATUSDATA), axiosConfig(cookies));
};

export const patchStatusData = (id: number, cookies: string, body: any) => {
  return axios.put(
    constructUrl(`${API_CONNECTIONS}${id}/`),
    body,
    axiosConfig(cookies)
  );
};

export const getConnectionsToDatabases = (
  cookies: string
) => {
  return axios.get(constructUrl(GET_CONNECTIONS), axiosConfig(cookies));
};

export const changeDataSource = async (cookies: string, source: string) => {
  try {
    const response = await axios.post(
      constructUrl(SETTINGS_DATA_SOURCE),
      { source },
      axiosConfig(cookies)
    );
    return response.data;
  } catch (error) {
    console.error("Error changing data source:", error);
    throw error;
  }
};
