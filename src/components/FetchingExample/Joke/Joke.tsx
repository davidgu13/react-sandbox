import React from "react";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchJoke } from "../../../clients";
import "./joke.css";

const FETCHING_QUERY_KEY = ["FETCH_SINGLE_JOKE"];

interface IJokeProps {
    jokeId: number;
    url: string;
}

const Joke = (props: IJokeProps): JSX.Element => {
    const { jokeId, url } = props;
    const controller = new AbortController();

    const { data: joke, isLoading } = useQuery({
        queryKey: [...FETCHING_QUERY_KEY, jokeId],
        queryFn: () => {
            return fetchJoke(url, { idRange: jokeId }, controller);
        },
    });

    // const {
    //     data: joke,
    //     isLoading,
    //     isFailed,
    // } = useFetch<JokeResponseType>({
    //     url,
    //     params: { idRange: jokeId },
    //     controller,
    // });

    const renderJokeContent = (): JSX.Element => {
        switch (joke?.type) {
        case "single": {
            return <>{joke.joke}</>;
        }
        case "twopart": {
            return (
                <>
                    <span style={{ fontWeight: "bold" }}>Setup:</span>
                    <br />
                    {joke.setup}
                    <br />
                    <span style={{ fontWeight: "bold" }}>Delivery:</span>
                    <br />
                    {joke?.delivery}
                </>
            );
        }
        default: {
            return <></>;
        }
        }
    };

    return (
        <div className="joke-container">
            <h2>#{jokeId + 1}</h2>
            {isLoading ? <Skeleton width={"95%"} /> : renderJokeContent()}
        </div>
    );
};

export default Joke;
