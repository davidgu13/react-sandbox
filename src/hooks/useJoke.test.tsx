import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { fetchJoke } from "../clients";
import useJoke, { IUseJokeProps } from "./useJoke";

const USE_JOKE_MOCK_PROPS: IUseJokeProps = {
    jokeId: 1,
    url: "https://v2.jokeapi.dev/joke/Any",
};

const QueryClientProviderWrapper = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
        // logger: { log: console.log, error: console.error, warn: console.warn },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
};

const renderUseJoke = (props: IUseJokeProps) => {
    const { result, unmount, rerender } = renderHook(() => useJoke(props), {
        wrapper: QueryClientProviderWrapper,
    });

    return { result, unmount, rerender };
};

describe("UseJoke", () => {
    it("Should be loading and then return the joke", async () => {
        const { result } = renderUseJoke(USE_JOKE_MOCK_PROPS);

        await waitFor(() => expect(result.current.isLoading));
        expect(result.current.isSuccess).toBeFalsy();

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
        expect(result.current?.joke).toBeDefined();
        expect(result.current?.joke?.type).toEqual("twopart");
    });

    it("Should make only 1 network request for 2 renders of the same keys", async () => {
        // NOT WORKING!
        const spiedFetchJoke = jest.spyOn({ fetchJoke }, "fetchJoke");
        const { result, rerender: rerenderUseJoke } = renderUseJoke(USE_JOKE_MOCK_PROPS);

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
        expect(result.current?.joke).toBeDefined();
        expect(spiedFetchJoke).toBeCalledTimes(1);

        rerenderUseJoke(USE_JOKE_MOCK_PROPS);

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
        expect(spiedFetchJoke).toBeCalledTimes(1);
    });
});
