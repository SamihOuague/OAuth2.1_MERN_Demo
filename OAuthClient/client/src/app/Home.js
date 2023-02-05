import React from "react";
import { Resources, Spinner } from "./Resources";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Resources path={"http://localhost:3001/"} render={(data) => {
                if (data.loading) return <Spinner/>
                else if (!data.payload || data.errorCode) {
                    return (
                        <h2>Error - 500</h2>
                    );
                }
                return (
                    <h2>{data.payload.msg}</h2>
                );
            }}/>
        </div>
    );
}

export default Home;