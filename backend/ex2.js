import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const users = [
    {id:1 , title:"Nandini Atri"}
]

app.get("/api/users" , (req , res) => {
    res.json(users);
})

app.listen(4000 , () => console.log("server running on port 4000"));
