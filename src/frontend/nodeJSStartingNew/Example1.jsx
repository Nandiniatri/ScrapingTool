import { useEffect, useState } from "react";

const Example1 = () => {
    const [message , setMessage] = useState("loading.....");

    const fetchNodeExample1Data = async() => {
        const response = await fetch('http://localhost:4000');
        const result = await response.text();
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