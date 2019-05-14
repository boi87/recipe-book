const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;
const dataFileName = "./data.json";
class Ingredient {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class Recipe {
  constructor(id, name, desc, imagePath, ingredients) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}

let data = {
  recipes: [
    new Recipe(
      1,
      "Wine",
      "Red, full bodied.",
      "https://s.tannico.it/media/catalog/product/cache/2/thumbnail/0dc2d03fe217f8c83829496872af24a0/8/0/8055681240063_01.jpg",
      [new Ingredient("Red Grapes", 100), new Ingredient("Sulphites", 20)]
    ),
    new Recipe(
      2,
      "Wine",
      "White, crisp and refreshing",
      "https://s.tannico.it/media/catalog/product/cache/43/thumbnail/0dc2d03fe217f8c83829496872af24a0/b/i/bia_3.jpg",
      [new Ingredient("White Grapes", 100), new Ingredient("Sulphites", 1)] // thanks to constructor
    )
  ]
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" })); // to support JSON-encoded bodies
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/recipes", (req, res) => {
  res.send(data.recipes);
});
app.post("/recipes/:id", (req, res) => {
  console.log("post", req.params, 'body!', req.body);
  const recipe = req.body;
  data.recipes[req.params.id] = {
    ...data.recipes[req.params.id],
    ...recipe
  };
  fs.writeFile(dataFileName, JSON.stringify(data, null, 2), () => {});
  res.send(data.recipes);
});
fs.readFile(dataFileName, (err, d) => {
  if (!err) {
    data = JSON.parse(d.toString("ascii"));
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
