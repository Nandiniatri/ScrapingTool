import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = 4000;

const users = [
    {id:1 , title:"Nandini Atri"}
]

app.get("/api/users" , (req , res) => {
    res.json(users);
})

app.listen(PORT , () => console.log(`server running on https://localhost:${PORT}`));
