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

app.get("/items", (req, res) => {
  res.json(items);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
