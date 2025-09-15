import apiClient from "./api";

export const getArticleDetails = (articleId) => {
  return apiClient(`articles/${articleId}`);
};

export const getAllArticles = () => {
  return apiClient("articles");
};
