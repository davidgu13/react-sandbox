import React from "react";
import { Virtuoso } from "react-virtuoso";
import Joke from "../Joke";
import "./jokes.css";

interface IJokes {
    jokesCount: number;
    jokesUrl: string;
}

export default function Jokes(props: IJokes) {
    const { jokesCount, jokesUrl } = props;

    return (
        <div className="jokes-container">
            {Array(jokesCount)
                .fill(null)
                .map((_, index): JSX.Element => {
                    return <Joke key={index} jokeId={index} url={jokesUrl} />;
                })}
        </div>
    );
}
