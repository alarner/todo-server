const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
let nextId = 1;

app.use(cors());
app.use(bodyParser.json());

const items = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/item", (req, res) => {
  if (!req.body.description) {
    return res.status(400).json({ error: "Missing description" });
  }
  const message = {
    id: nextId++,
    description: req.body.description,
    completed: !!req.body.completed,
    createdAt: new Date(),
  };
  items.push(message);
  res.json(message);
});

app.put("/item/:id", (req, res) => {
  if (!items[req.params.id - 1]) {
    return res.status(404).json({ error: "Unknown item" });
  }
  if (req.body.description) {
    items[req.params.id - 1].description = req.body.description;
  }
  if (req.body.completed) {
    items[req.params.id - 1].completed = !!req.body.completed;
  }
  res.json(items[req.params.id - 1]);
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
