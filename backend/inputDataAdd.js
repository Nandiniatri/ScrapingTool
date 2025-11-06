// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());



import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


let notes = [];

app.post("/addNote", (req, res) => {
    console.log("Received data:", req.body);
    
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const newNote = { id: notes.length + 1, text };
    notes.push(newNote);
    res.json({ message: "Note added!", note: newNote });
});


app.get("/getNotes", (req, res) => {
    res.json(notes);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
