
const express = require("express");
const app = express();

app.use(express.json());

// Dummy Users
let users = [
  { id: 1, name: "Ali", age: 22 },
  { id: 2, name: "Ahmed", age: 24 },
  { id: 3, name: "Wajhi", age: 21 }
];

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Welcome to my Express CRUD API! Go to /users to see all users.");
});


// 1. GET ALL USERS
app.get("/users", (req, res) => {
  res.json(users);
});

// 2. GET SINGLE USER
app.get("/users/:id", (req, res) => {
  const user = users.find(
    (u) => u.id === Number(req.params.id)
  );

  if (!user) {
    return res.json({ message: "User not found" });
  }

  res.json(user);
});

// 3. ADD NEW USER
app.post("/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    name: req.body.name,
    age: req.body.age
  };

  users.push(newUser);

  res.json({
    message: "User added successfully",
    user: newUser
  });
});

// 4. DELETE USER
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userExists = users.find((u) => u.id === id);

  if (!userExists) {
    return res.json({ message: "User not found" });
  }

  users = users.filter((u) => u.id !== id);

  res.json({ message: "User deleted successfully" });
});

// 5. UPDATE USER
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  user.name = req.body.name;
  user.age = req.body.age;

  res.json({
    message: "User updated successfully",
    user: user
  });
});

// SERVER
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
