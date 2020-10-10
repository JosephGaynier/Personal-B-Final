const express = require("express");
const cors = require("cors");
const app = express();
const budget = require("./budget-data.json");
const port = 3001;

app.use(cors());

app.get("/budget", (req, res) => {
  res.json(budget);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost: ${port}`);
});
