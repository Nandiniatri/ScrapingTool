import { useState } from "react";

const WithSupabaseFetchDataComponent = () => {
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
            console.error("Error fetching users:", error);
        } else {
            setUsers(data);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} — {user.email}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default WithSupabaseFetchDataComponent;