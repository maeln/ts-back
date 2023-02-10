import express from "express";

const app = express();
const port = 3005;

app.get("/", (req, res) => {
  res.send("Hello World 2 1 4 7!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
