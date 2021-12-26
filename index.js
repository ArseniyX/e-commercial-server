import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;
const API = "https://fakestoreapi.com/products";
const PRODUCTS = "products.json";

fetch(API)
  .then((data) => data.text())
  .then((resp) => {
    fs.writeFile(PRODUCTS, resp, "utf8", (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    });
  });

const jsonProducts = fs.readFileSync(PRODUCTS);
const products = JSON.parse(jsonProducts);
const categories = products.map((product) => product.category);

const uniq = (a) => [...new Set(a)];

app.get("/products/list/:id", cors(), (req, resp) => {
  switch (req.params.id) {
    case "1":
      resp.json(products.slice(0, 10));
      break;
    case "2":
      resp.json(products.slice(10, 20));
      break;
    default:
      resp.json(products);
      break;
  }
});

app.get("/categories/", cors(), (req, resp) => {
  resp.json({ categories: uniq(categories) });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
