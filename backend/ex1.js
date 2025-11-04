import express from "express";
import cors from "cors";


const app = express();
app.use(cors())

const PORT = 4000;

app.get("/" , (req , res) => {
    res.send("Hello World this is my first backend example");  
})

app.listen(PORT , () => {
    console.log(`server running on http://localhost:${PORT}`);
});

