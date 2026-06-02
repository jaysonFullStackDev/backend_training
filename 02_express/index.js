import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const userData = [];
let nextId = 1;

//Create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: nextId++, name, email };
  userData.push(newUser);
  res.status(201).send(userData);
});

//Read all users
app.get("/users", (req, res) => {
  res.status(200).send(userData);
});

//Read one user by ID
app.get("/users/:id", (req, res) => {
  const user = userData.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  } else {
    res.status(200).send(user);
  }
});

//Edit a user by ID
app.put("/users/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing. Send JSON with Content-Type: application/json");
  }
  const user = userData.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("User not found");
  }
  const { name, email } = req.body;
  user.name = name;
  user.email = email;
  res.status(200).send(user);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = userData.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }
  userData.splice(userIndex, 1);
  res.status(200).send("User deleted");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
