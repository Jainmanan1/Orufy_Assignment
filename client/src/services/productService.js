import api from "./api";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const getPublishedProducts = async () => {
  const res = await api.get("/products/published");
  return res.data;
};

export const getUnpublishedProducts = async () => {
  const res = await api.get("/products/unpublished");
  return res.data;
};

export const createProduct = async (productData) => {
  const payload = {
    ...productData,
    images: productData.images ? [productData.images] : [],
  };

  const res = await api.post("/products", payload);
  return res.data;
};

export const toggleProductPublish = async (id) => {
  const res = await api.patch(`/products/${id}/toggle`);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const payload = {
    ...productData,
    images: productData.images ? [productData.images] : [],
  };

  const res = await api.patch(`/products/${id}`, payload);
  return res.data;
};
