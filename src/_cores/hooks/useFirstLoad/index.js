// --- libraries
import { useState, useEffect } from 'react';

const useFirstLoad = (model) => {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const handleFetch = async () => {
    const { data: dataResponse, error: errorResponse } = await model;
    if (errorResponse) {
      setError(errorResponse);
    } else {
      setData(dataResponse);
    }
    setReady(true);
  };

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line
  }, []);

  return {
    ready,
    data,
    error
  };
};

export default useFirstLoad;
