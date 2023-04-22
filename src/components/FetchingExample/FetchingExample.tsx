import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Joke from "./Joke";

const JOKES_URL = "https://v2.jokeapi.dev/joke/Any";
const url =
    "https://v2.jokeapi.dev/joke/Any?idRange=0-20&blacklistFlags=religious,political";
const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

interface IJokes {
    jokesCount: number;
}

function Jokes(props: IJokes) {
    const { jokesCount } = props;
    
    return (
        <>
            {Array(jokesCount)
                .fill(null)
                .map((_, index): JSX.Element => {
                    return <Joke key={index} jokeId={index} url={JOKES_URL} />;
                })}
        </>
    );
}

interface IFetching {
    jokesCount: number;
}

/**
 * Fetch jokes and render them
 * @returns A big list of jokes that are fetched from the JokesAPI
 */
const FetchingExample = (props: IFetching): JSX.Element => {
    const { jokesCount } = props;

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Jokes jokesCount={jokesCount}/>
                {/* <ReactQueryDevtools initialIsOpen={false}/> */}
            </QueryClientProvider>
        </>
    );
};

export default FetchingExample;
