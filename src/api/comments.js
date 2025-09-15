import apiClient from "./api";

export const submitComment = (commentData) => {
  return apiClient("comments", {
    method: "POST",
    body: commentData,
  });
};
