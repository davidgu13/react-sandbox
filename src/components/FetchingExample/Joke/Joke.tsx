import React from "react";
import useFetch from "../../../hooks";
import { JokeType } from "../../../types/types";
import "./joke.css";

interface IJokeProps {
    jokeId: number;
    url: string;
}

const Joke = (props: IJokeProps): JSX.Element => {
    const { jokeId, url } = props;
    const controller = new AbortController();

    const {
        data: joke,
        isLoading,
        isFailed,
    } = useFetch<JokeType>({ url, params: { idRange: jokeId }, controller });

    return (
        <>
            <h3># {jokeId + 1}</h3>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    Setup:
                    <br />
                    {joke?.setup}
                    <br />
                    Delivery:
                    <br />
                    {joke?.delivery}
                    AAAAKAKAKAKAKA
                </>
            )}
        </>
    );
};

export default Joke;
