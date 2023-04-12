import React, { useEffect, useState } from "react";

function Example2() {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [fullName, setFullName] = useState("");

    const [name3, setName3] = useState("");
    const [name4, setName4] = useState("");
    const [fullName2, setFullName2] = useState("");

    useEffect(() => {
        console.log("Inside useEffect 1");
        setFullName(`${name1} ${name2}`);
    }, [name1, name2]);

    useEffect(() => {
        console.log("Inside useEffect 2");
        setFullName2(`${name3} ${name4}`);
    }, [name3, name4]);

    console.log("rendering");

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                autoFocus
            />
            <input value={name2} onChange={(e) => setName2(e.target.value)} />
            {fullName}

            <br />

            <input
                value={name3}
                onChange={(e) => setName3(e.target.value)}
                autoFocus
            />
            <input value={name4} onChange={(e) => setName4(e.target.value)} />
            {fullName2}
        </div>
    );
}

export default Example2;
