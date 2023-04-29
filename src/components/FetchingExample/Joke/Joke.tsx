import React from "react";
import { Skeleton } from "@mui/material";
import { useJoke } from "../../../hooks";
import "./joke.css";

interface IJokeProps {
    jokeId: number;
    url: string;
}

const Joke = (props: IJokeProps): JSX.Element => {
    const { jokeId, url } = props;

    const { joke, isLoading } = useJoke({jokeId, url});

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
