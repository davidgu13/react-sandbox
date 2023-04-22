/* 

This hook should contain an implementation of a hook that fetches data from some url given some parameters (body), and configurations (also part of the body).
It should also handle well cases of unmounting (use <StrictMode/>!), loading, error, refetch & cancellation (AbortSignal, axios.cancelToken ?) and caching (ReactQuery ?)

Points to consider:
- The state management: loading - error - succeeded -> single / separate states? Reducer? other solutions?
- Caching - very important
- Cancellation (if possible, before reaches the server) - very important

You may use http://jsonplaceholder.typicode.com/posts or https://sv443.net/jokeapi/v2/ for simulating the requests & UI.
https://v2.jokeapi.dev/joke/Any?idRange=0-20&blacklistFlags=religious,political
 Experiment with Skeleton loading in MUI, showing multiple fetched objects shown in a list (use virtu alization!), and Network & CPU throttling.

The implementation should be as generic as possible, since this idea has many use cases!

Good luck!

*/

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { QueryClient } from "react-query";

interface IUseFetch {
    url: string;
    params: Record<string, unknown>;
    controller: AbortController;
    queryClient: QueryClient;
}

function useFetch<T>({ url, params, controller, queryClient }: IUseFetch) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [data, setData] = useState<T | null>();

    const fetch = useCallback(async () => {
        try {
            setIsLoading(true);
            setData(null);
            setIsFailed(false);

            const response = await axios.get(url, {
                params: { ...params },
                signal: controller.signal,
            });

            if (response) {
                setData(response.data);
            }
        } catch {
            setIsFailed(true);
        } finally {
            setIsLoading(false);
        }
    }, [controller.signal, params, url]);

    useEffect(() => {
        fetch();

        return () => {
            controller.abort();
            queryClient.removeQueries(["fetching"]);
        };
    }, [controller, fetch, params, queryClient, url]);

    return { isLoading, isFailed, data };
}

export default useFetch;
