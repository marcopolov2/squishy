import axios from "axios";

export const apiCall = async (url, data, method, config = {}) => {
  try {
    const response = await axios[method](url, data, config);
    return response.data;
  } catch (error) {
    return { error: error?.response?.data?.error || "An error occurred." };
  }
};
