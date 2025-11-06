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
            <input type="text" onChange={handleText} value={inputValueSave}/>
            <button onClick={handleSave}>Save</button>
            {saveData.map((item) => {
                return (
                    <ul>
                        <li>{item}</li>
                    </ul>
                )
            })}
        </>
    )
}

export default InputField;