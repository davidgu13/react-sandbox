import React, { StrictMode } from "react";
import Example1 from "../Example1";
import Example2 from "../Example2";
import CustomScrollbar from "../CustomScrollbar";
import FetchingExample from "../FetchingExample";
import "./app.css";

const App = (): JSX.Element => {
    return (
        // <StrictMode>
        <>
            <h1>Hellooooo00 React!</h1>
            {/* <Example1 /> */}
            {/* <Example2 /> */}
            {/* <CustomScrollbar /> */}
            <FetchingExample jokesCount={1} />
        </>
        // </StrictMode>
    );
};

export default App;
