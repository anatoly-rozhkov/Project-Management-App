import { useState, useEffect } from "react";

const useRetreiveMethod = (endpoint) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch item');
        return response.json();
      })
      .then((data) => setItem(data))
  }, [endpoint]);

  return item;
};

export default useRetreiveMethod;