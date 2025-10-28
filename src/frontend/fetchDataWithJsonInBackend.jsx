import { useEffect, useState } from "react";

export default function Users1() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    }, []);
 
    return (
        <div>
            <h1>User List</h1>
            {users.map((u) => (
                    <p key={u.id}>{u.id}. {u.name} — {u.role}</p>
            ))}
        </div>
    );
}