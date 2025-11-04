import { useEffect, useState } from "react";

const Example1 = () => {
    const [message , setMessage] = useState([]);

    const fetchNodeExample1Data = () => {
        const response = fetch();
        const result = response.json();
        setMessage(result);
    }

    useEffect(() => {
        fetchNodeExample1Data();
    },[])

    return (
        <>
            <h1>{message}</h1>
        </>
    )
}

export default Example1;