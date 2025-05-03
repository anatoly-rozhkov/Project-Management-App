import api from "./RefreshMethod";

async function PostMethod(endpoint, objectData) {
  try {
    const response = await api.post(endpoint, objectData);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.detail || "Failed to create item";
    throw new Error(errorMsg);
  }
}

export default PostMethod;
