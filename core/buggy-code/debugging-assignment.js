const express = require("express");
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];
const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

//BUG 1: `userList` was undefined — should be `allUsers` or just `users`
app.get("/users", (req, res) => {
  const allUsers = users;
  res.send(allUsers);     //was: res.send(userList)
});

//BUG 2: req.params.id is a STRING, but user ids are NUMBERS — must convert with Number()
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);     //was: const id = req.params.id
  const user = users.find(u => u.id === id);
  res.send(user);
});

//BUG 3: Function never returns a value
function getUserById(id) {
  const user = users.find(u => u.id === id);
  return user;      // was: missing return
}

//BUG 4: `notes.lenght` is a typo - should be `notes.length`
app.get("/notes/count", (req, res) => {
  const total = notes.length;                   //was: notes.lenght
  res.send({ total });
});



//BUG 5: fetchExternalData() is async but wasn't awaited, and `async` was missing
app.get("/external-data", async (req, res) => {
  const data = await fetchExternalData();             // was: const data = fetchExternalData()
  res.send(data);
});


//BUG 6: `notes = []` is an assignment, not a comparison - should be `notes.length === 0`
app.get("/notes", (req, res) => {
  if (notes.length === 0) {               // was: if (notes = [])
    console.log("No notes found");
  }
  res.send(notes);
});




//BUG 7: `Math.random() * 1000` returns a float - use Math.floor() for a clean integer id
function generateNoteId() {
  return Math.floor(Math.random() * 1000);        //was: Math.random() * 1000
}


//BUG 8: `generateNoteId` without () is a function reference, not a call
const newId = generateNoteId();       //was: generateNoteId




//BUG 9: `!title && !content` means BOTH must be missing — should be `||` (either is enough to be invalid)
app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content) {                               //was: if (!title && !content)
    return res.status(400).send("Invalid input");         //was: missing status code
  }
  const newNote = { id: newId, title, content, userId };
  notes.push(newNote);
  res.status(201).send(newNote);
});



// BUG 10: req.params.id is a string, note ids are numbers - convert with Number()
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);       // was: const id = req.params.id
  const noteIndex = notes.findIndex(n => n.id === id);
  if (noteIndex === -1) return res.status(404).send({ message: "Note not found" });
  notes.splice(noteIndex, 1);
  res.send({ message: "Note deleted" });
});




//BUG 11: `username` is undefined - should be `name`
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const user = users.find(u => u.id == id);
  if (!user) return res.status(404).send({ message: "User not found" });
  user.name = name;   // was: user.name = username
  res.send(user);
});

//BUG 12: `n.userId = userId` is assignment inside filter, not comparison - should be `===`
app.get("/user-notes/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const userNotes = notes.filter(n => n.userId === userId);       //was: n.userId = userId
  res.send(userNotes);
});


//BUG 13: `||` should be `&&` — both email AND password must match for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@test.com" && password === "123456") {                //was: ||
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});




//BUG 14 (bonus): `.filter()` returns an array - use `.find()` for a single user, then access `.name`
app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);      //was: users.filter(...)
  if (!user) return res.status(404).send({ message: "User not found" });
  res.send(user.name);
});



//BUG 15 (bonus): a and b may come in as strings - convert to numbers to avoid "12" instead of 3
app.post("/sum", (req, res) => {
  const a = Number(req.body.a);           //was: const { a, b } without conversion
  const b = Number(req.body.b);
  const total = a + b;
  res.send({ total });
});




//BUG 16: Console says port 5000 but app.listen uses 3000 - pick one and be consistent
app.listen(3000, () => {
  console.log("Server running on port 3000");       //was: "...port 5000"
});