import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// const PORT = 4000;

const users = [
    { id: 1, title: "Nandini Atri" },
    { id: 2, title: "Backend Connected Successfully 🚀" }
]

app.get("/api/users", (req, res) => {
    res.json(users);
})

app.listen(4000, () => console.log('server running on https://localhost:4000'));
