import express from "express";
import { sql } from "../database/index.js";

export const productsRouter = express.Router();

productsRouter.get("/", async (request, response) => {
  try {
    const products = await sql`SELECT * FROM products`;

    response.status(200).json({ products: { products } });
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});

productsRouter.post("/", async (request, response) => {
  const { productname, categoryid, price } = request.body;
  try {
    const newProduct = sql`INSERT INTO products(productname, categoryid, price)
                            Values(${productname}, ${categoryid}, ${price})`;
    response.status(200).json({ nemsen_product: { newProduct } });
  } catch (error) {
    response.status(400).json({ message: "add product uildel aldaa garlaa" });
  }
});

productsRouter.delete("/", async (request, response) => {
  const { id } = request.body;
  try {
    await sql`Delete from products where productid=${Number(id)}`;
    response.status(200).json({ message: "amjilttai ustgalaa" });
  } catch (error) {
    response.status(400).json({ message: "Delete hiih id oldsongui" });
  }
});

productsRouter.put("/", async (request, response) => {
  const { id, firstName, lastName, email, address } = request.body;
  try {
    await sql`Update customers
                set firstname=${firstName}, lastname = ${lastName}, email=${email}, address=${address}
                where customerid=${Number(id)};`;
    response.status(200).json({ message: "amjilttai update hiilee" });
  } catch (error) {
    response.status(400).json({ message: "Update uildel aldaa garlaa" });
  }
});
