const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const search = async (query) => {
  if (query.length < 3) {
    return { allResultCourses: [], allResultArticles: [] };
  }
  const response = await fetch(`${BASE_URL}/search/${query}`);
  if (!response.ok) {
    throw new Error("Search failed");
  }
  return response.json();
};
