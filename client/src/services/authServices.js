import api from "./api";

export const requestOtp = async (value) => {
  const payload = value.includes("@") ? { email: value } : { phone: value };

  const res = await api.post("/auth/request-otp", payload);
  return res.data;
};

export const verifyOtp = async (value, otp) => {
  const payload = value.includes("@")
    ? { email: value, otp }
    : { phone: value, otp };

  const res = await api.post("/auth/verify-otp", payload);
  return res.data;
};

export const resendOtp = async (value) => {
  const payload = value.includes("@") ? { email: value } : { phone: value };

  const res = await api.post("/auth/resend-otp", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
