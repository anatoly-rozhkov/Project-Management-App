async function PostPethod(endpoint, objectData) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objectData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create item");
    }
    
    return response.json();
  }
  
  export default PostPethod;