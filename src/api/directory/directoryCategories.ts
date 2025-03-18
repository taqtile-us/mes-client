import axios from "axios";

import { API_BASE_URL } from "../../config";
import { getAxiosConfig } from "../../utils/getAxiosConfig";

const API_DIRECTORY_ITEMS = "reference-items/";
const API_DIRECTORY = "reference/";

const constructUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;

export const createDirectoryCategory = (name: string, referenceId: number, cookies: string) => {
  return axios.post(
    constructUrl(API_DIRECTORY_ITEMS),
    { name, referenceId },
    getAxiosConfig(cookies)
  );
};

export const getDirectoryCategory = (referenceId: number, cookies: string) => {
  return axios.get(
    constructUrl(`${API_DIRECTORY_ITEMS}${API_DIRECTORY}${referenceId}/`),
    getAxiosConfig(cookies)
  );
};

export const updateDirectoryCategory = (
  id: number,
  referenceId: number,
  name: string,
  cookies: string
) => {
  return axios.patch(
    constructUrl(`${API_DIRECTORY_ITEMS}${id}/`),
    { name, referenceId },
    getAxiosConfig(cookies)
  );
};

export const deleteDirectoryCategory = (id: number, cookies: string) => {
  return axios.delete(constructUrl(`${API_DIRECTORY_ITEMS}${id}/`), getAxiosConfig(cookies));
};
