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

    
    const fetchNotes = async () => {
        try {
            const response = await fetch("http://localhost:4000/getNotes");
            const result = await response.json();
            console.log("result for note" , result);
            
            setSaveData(result);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    
    const handleSave = async () => {
        if (!inputValueSave.trim()) return alert("Enter something!");

        try {
            const response = await fetch("http://localhost:4000/addNote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: inputValueSave }),
            });

            const result = await response.json();
            setSaveData([...saveData, result.note]);
            setInputValueSave("");
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleText = (e) => {
        setInputValueSave(e.target.value);
    };

    return (
        <>
            <input type="text" onChange={handleText} value={inputValueSave} />
            <button onClick={handleSave}>Add Note</button>
            <ul>
                {saveData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </>
    );
};

export default InputField;
