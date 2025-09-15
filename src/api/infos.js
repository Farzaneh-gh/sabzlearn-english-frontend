const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getIndexInfos = async () => {
  const response = await fetch(`${BASE_URL}/infos/index`);
  if (!response.ok) {
    throw new Error("Failed to fetch index infos");
  }
  return response.json();
};
