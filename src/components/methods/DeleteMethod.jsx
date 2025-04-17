import axios from 'axios';

async function deleteItem(endpoint) {
  try {
    await axios.delete(endpoint);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export default deleteItem;