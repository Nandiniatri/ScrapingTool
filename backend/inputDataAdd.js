// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());


// let notes = [];

// app.post("/addNote", (req, res) => {
//     console.log("Received data:", req.body);

//     const { text } = req.body;

//     if (!text) {
//         return res.status(400).json({ error: "Text is required" });
//     }

//     const newNote = { id: notes.length + 1, text };
//     notes.push(newNote);
//     res.json({ message: "Note added!", note: newNote });
// });


// app.get("/getNotes", (req, res) => {
//     res.json(notes);
// });

// const PORT = 4000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));





import express from "express";
import cors from "cors";
import { supabase } from "./inputSupabase";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ POST - Add note
app.post("/addNote", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const { data, error } = await supabase
    .from("notes")
    .insert([{ text }])
    .select();

  if (error) {
    console.error("Insert error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Note added!", note: data[0] });
});

// ✅ GET - Fetch notes
app.get("/getNotes", async (req, res) => {
  const { data, error } = await supabase.from("notes").select("*");

  if (error) {
    console.error("Fetch error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
