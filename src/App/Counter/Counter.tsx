import React, { useEffect, useState } from "react";

const Counter = (): JSX.Element => {
    const [count, setCount] = useState(0);

    const adjustCount = (amount: number) => {
        setCount((prevCount) => prevCount + amount);
        console.log(`Count value before re-rendering = ${count}`);
    };

    useEffect(() => {
        console.log(`Count value after re-rendering = ${count}`);
    }, [count]);

    return (
        <div style={{ display: "flex", gap: "1em", fontSize: "40px" }}>
            <button
                style={{ fontSize: "40px" }}
                onClick={() => adjustCount(-1)}
            >
                -
            </button>
            <span>{count}</span>
            <button style={{ fontSize: "40px" }} onClick={() => adjustCount(1)}>
                +
            </button>
        </div>
    );
};

export default Counter;
