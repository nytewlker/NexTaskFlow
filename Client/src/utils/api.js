import axios from "axios";

export const baseURL = "http://localhost:5000/api/";

export const apiRequest = async (endpoint, method, body) => {
  const url = `${baseURL}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      headers: { "Content-Type": "application/json" },
      data: body,
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data.message || "Something went wrong");
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
