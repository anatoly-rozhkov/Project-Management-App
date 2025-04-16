import axios from 'axios';

async function deleteItem(itemId) {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/tasks/${itemId}/`);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export default deleteItem;