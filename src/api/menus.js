import apiClient from "./api";

const CACHE_KEY = "menus_cache";
const CACHE_TTL = Number(import.meta.env.VITE_MENUS_CACHE_TTL) || 5 * 60 * 1000; // 5 minutes

export const getMenus = async () => {
  // Try to return cached menus if fresh
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed._ts && Date.now() - parsed._ts < CACHE_TTL) {
        return parsed.data;
      }
    }
  } catch (_err) {
    // ignore localStorage errors
  }

  const data = await apiClient("menus");

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ _ts: Date.now(), data }));
  } catch (_err) {
    // ignore
  }

  return data;
};
