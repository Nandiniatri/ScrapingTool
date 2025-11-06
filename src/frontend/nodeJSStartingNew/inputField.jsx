import { useState } from "react";

const InputField = () => {
    const [inputValueSave, setInputValueSave] = useState('');
    const [saveData, setSaveData] = useState([]);

    const handleText = (e) => {
        console.log(e.target.value);
        setInputValueSave(e.target.value);
    }

    const handleSave = () => {
        if (inputValueSave.trim() !== "") {
            setSaveData([...saveData, inputValueSave]);
            setInputValueSave("");
        }
    }

    return (
        <>
            <input type="text" onChange={handleText} value={inputValueSave} />
            <button onClick={handleSave}>Save</button>
            <ul>
                {saveData.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </>
    )
}

export default InputField;