import api from "./RefreshMethod";

async function deleteItem(endpoint) {
  try {
    await api.delete(endpoint);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

export default deleteItem;
