import React, { useState, useEffect } from "react";

export const Resources = ({ path, render, options }) => {
    const [ payload, setPayload ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ errorCode, setErrorCode ] = useState(null);

    useEffect(() => {
        fetch(path, options || {}).then((res) => {
            return res.json();
        }).then((pld) => {
            setPayload(pld);
            setLoading(false);
        }).catch((err) => {
            setErrorCode(err);
            setLoading(false);
        });
    }, [path, options]);

    return render({ payload, loading, errorCode });
}

export const Spinner = () => {
    return (
        <h1>Loading...</h1>
    );
}