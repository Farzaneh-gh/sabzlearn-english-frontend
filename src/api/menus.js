import apiClient from "./api";

export const getMenus = () => {
  return apiClient("menus");
};
