import { useState, useEffect } from 'react';


export default function useFetch(url, dependencies) {
  const [fetchState, setFetchState] = useState(null);

  useEffect(() => {
    if (url) {
      let ignore = false;
      setFetchState({
        data: null,
        error: null,
        id: 'loading'
      });
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
          }
          return response.json();
        })
        .then(json => {
          if (!ignore) {
            setFetchState({
              data: json,
              error: null,
              id: 'success'
            });
          }
        })
        .catch(error => {
          setFetchState({
            data: null,
            error: error,
            id: 'error'
          });
        });
      return () => {
        ignore = true;
      };
    }
  }, dependencies);
  return fetchState;
}
