import express from "express";
import { sql } from "../database/index.js";

export const ordersRouter = express.Router();

ordersRouter.get("/", async (request, response) => {
  try {
    const products = await sql`SELECT * FROM orders`;
    response.status(200).json({ products: { products } });
  } catch (error) {
    response.status(400).json({ messsage: "aldaa garlaa" });
  }
});

ordersRouter.post("/", async (request, response) => {
  const { productid, customerid, quantity } = request.body;
  try {
    console.log("first");
    const newProduct =
      await sql`INSERT INTO orders( productid, customerid, quantity)
                                  Values(${productid},${customerid},${quantity}) `;
    console.log("second");
    console.log(newProduct);
    response.status(200).json({ newProduct: { newProduct } });
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "aldaa garlaa" });
  }
});

ordersRouter.put("/", async (request, response) => {
  try {
    const { id, productid, customerid, quantity } = request.body;
    await sql`UPDATE orders
            SET productid= ${productid} ,customerid=${customerid}, quantity=${quantity}
            WHERE orderid=${Number(id)} `;
  } catch (error) {
    response.status(400).json({ message: "aldaa garloo" });
  }
});
ordersRouter.delete("/", async (request, response) => {
  try {
    const { id } = request.body;
    await sql`DELETE from orders WHERE orderid = ${Number(id)}`;
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});

ordersRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  try {
    const customerOrder = await sql`SELECT quantity, firstname, productname
                            FROM orders
                            Inner join customers on orders.customerid = customers.customerid 
                            Inner join products on orders.productid = products.productid
                            WHERE orders.customerid = ${id}`;
    response.status(200).json({ message: { customerOrder } });
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: "aldaa" });
  }
});
