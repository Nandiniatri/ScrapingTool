// import { useState } from "react";

// const InputField = () => {
//     const [inputValueSave, setInputValueSave] = useState('');
//     const [saveData, setSaveData] = useState([]);

//     const handleText = (e) => {
//         console.log(e.target.value);
//         setInputValueSave(e.target.value);
//     }

//     const handleSave = () => {
//         if (inputValueSave.trim() !== "") {
//             setSaveData([...saveData, inputValueSave]);
//             setInputValueSave("");
//         }
//     }

//     return (
//         <>
//             <input type="text" onChange={handleText} value={inputValueSave} />
//             <button onClick={handleSave}>Save</button>
//             <ul>
//                 {saveData.map((item, index) => (
//                     <li key={index}>{item}</li>
//                 ))}
//             </ul>
//         </>
//     )
// }

// export default InputField;

import { useState, useEffect } from "react";

const InputField = () => {
    const [inputValueSave, setInputValueSave] = useState("");
    const [saveData, setSaveData] = useState([]);

    // ✅ Fetch data from backend (run on first render)
    const fetchNotes = async () => {
        try {
            const response = await fetch("http://localhost:4000/getNotes"); // 👈 http (not https)
            const result = await response.json();
            setSaveData(result);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // ✅ Save data to backend
    const handleSave = async () => {
        if (!inputValueSave.trim()) return alert("Enter something!");

        try {
            const response = await fetch("http://localhost:4000/addNote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputValueSave }),
            });

            const result = await response.json();
            setSaveData([...saveData, result.note]); // add new note to list
            setInputValueSave(""); // clear input
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    // ✅ Run once when component loads
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleText = (e) => {
        setInputValueSave(e.target.value);
    };

    return (
        <>
            <input type="text" onChange={handleText} value={inputValueSave} />
            <button onClick={handleSave}>Save</button>
            <ul>
                {saveData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </>
    );
};

export default InputField;
