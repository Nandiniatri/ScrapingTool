const express = require("express");

const app = express();

const PORT = 4000;

app.get("/" , (req , res) => {
    res.send("Hello World this is my first backend example");  
})

app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`);
});

