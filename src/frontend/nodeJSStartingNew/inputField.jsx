import { useState } from "react";

const InputField = () => {
    const [inputValueSave , setInputValueSave] = useState('');

    const handleText = (e) => {
        console.log(e.target.value);
        
        // setInputValueSave()
    }

    return (
        <>
            <input type="text" onChange={(e) => handleText(e)} value={inputValueSave}/>

        </>
    )
}

export default InputField;