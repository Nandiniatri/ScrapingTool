import { useState } from "react";

const InputField = () => {
    const [inputValueSave, setInputValueSave] = useState('');
    const [saveData , setSaveData] = useState([]);

    const handleText = (e) => {
        console.log(e.target.value);
        setInputValueSave(e.target.value);
    }

    const handleSave = () => {
        setSaveData(inputValueSave);
    }

    return (
        <>
            <input type="text" onChange={handleText} />
            <button onClick={handleSave}>Save</button>
            <h1>{saveData}</h1>
        </>
    )
}

export default InputField;