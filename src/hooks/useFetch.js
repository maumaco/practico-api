import { useState, useEffect } from 'react';


export default function useFetch(url, counter) {
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
          // response.status it is not a 2xx HTTP-status code
          if (!response.ok) {
            throw new Error(response.status + ' ' + response.statusText);
          }

          return response.json();
        })

        // Valid JSON
        .then(json => {
          if (!ignore) {
            setFetchState({
              data: json,
              error: null,
              id: 'success'
            });
          }
        })

        // Failed to fetch (Internet disconnected, blocked by CORS, name not resolved)
        // Invalid URL directory, file or query path (not found, server error, forbidden)
        // Invalid JSON
        .catch(error => {
          setFetchState({
            data: null,
            error: error,
            id: 'error'
          });
        });

      // Cleanup function
      return () => {
        ignore = true;
      };
    }
  }, [url, counter]);

  return fetchState;
}
