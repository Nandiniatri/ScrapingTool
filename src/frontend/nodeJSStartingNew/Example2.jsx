import { useEffect, useState } from "react";

const Example2 = () => {
    const [data , setData] = useState([]);

    const fetchUsers = async() => {
        const response = await fetch("/api/users");
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        fetchUsers();
    },[])

    return (
        <>
            {data.map((item) => {
                return (
                    <h1>{item.title}</h1>
                )
            })}
        </>
    )
}

export default Example2;