import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

export function getPictures() {
  return http.get(apiEndpoint);
}
