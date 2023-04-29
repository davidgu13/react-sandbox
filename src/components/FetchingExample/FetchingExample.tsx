import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Jokes from "./Jokes";

const JOKES_URL = "https://v2.jokeapi.dev/joke/Any";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false, staleTime: Infinity, cacheTime: Infinity },
    }, // to be modified
});

/**
 * Fetch jokes and render them
 * @returns A big list of jokes that are fetched from the JokesAPI
 */
const FetchingExample = (props: { jokesCount: number }): JSX.Element => {
    const { jokesCount } = props;

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Jokes jokesCount={jokesCount} jokesUrl={JOKES_URL} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};

export default FetchingExample;
