import { useEffect, useState } from "react";

const Example2 = () => {
    const [data, setData] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch("/api/users");
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>👋 Frontend Connected to Backend</h2>
            {data.map(user => (
                <h3 key={user.id}>{user.title}</h3>
            ))}
        </div>
    )
}

export default Example2;