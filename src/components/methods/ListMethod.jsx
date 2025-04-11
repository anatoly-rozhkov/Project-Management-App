import { useState, useEffect } from "react";

function useListMethod(endpoint) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch items');
        return response.json();
      })
      .then((data) => setItems(data.results || data))
  }, [endpoint]);
  
  return items;
};


export default useListMethod;
