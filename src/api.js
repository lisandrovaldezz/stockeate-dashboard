import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.trim() || "https://stockeate.onrender.com";

export const api = axios.create({
  baseURL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export const updateProduct = async (code, branchId, updateData) => {
  const res = await api.patch(
    `/products/${code}?branchId=${branchId}`,
    updateData
  );
  return res.data;
};

export const toggleProductActive = async (code, branchId) => {
  const res = await api.patch(`/products/toggle-active/${code}`, { branchId });
  return res.data;
};

export const addProduct = async (branchId, productData) => {
  const res = await api.post("/products", {
    branchId,
    ...productData,
  });
  return res.data;
};

export const createRemito = async (remitoData) => {
  const res = await api.post("/remitos", remitoData);
  return res.data;
};

export const getRemitosStats = async (branchId, year, month) => {
  const res = await api.get(
    `/remitos/stats/monthly?year=${year}&month=${month}&branchId=${branchId}`
  );
  return res.data;
};

export const getRemitosStatsLast6Months = async (branchId) => {
  const res = await api.get(
    `/remitos/stats/last-6-months/remitos?branchId=${branchId}`
  );
  return res.data;
};

export const getProductsStatsLast6Months = async (branchId) => {
  const res = await api.get(
    `/remitos/stats/last-6-months/productos?branchId=${branchId}`
  );
  return res.data;
};
