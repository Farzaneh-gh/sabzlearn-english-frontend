import Cookies from "js-cookie";
import { AUTH_COOKIE_KEY } from "../utils/constants";
import apiClient from "./api";


export const editAccount = (accountData) => {
  return apiClient("users", {
    method: "PUT",
    body: accountData,
  });
};