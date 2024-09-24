import express from "express";
import { sql } from "../database";

export const customersRouter = express.Router();

customersRouter.get("/", async (_request, response) => {
  const customers = await sql`SELECT * FROM customers`;

  response.status(200).json({
    data: customers,
  });
});

customersRouter.post("/", async (request, response) => {
  const { firstName, lastName, email, address } = request.body;

  try {
    await sql`INSERT INTO customers (firstName, lastName, email, address)
              VALUES (${firstName}, ${lastName}, ${email}, ${address})`;

    response.status(200).json({ customer: request.body });
  } catch (error) {
    response.status(400).json({ message: "aldaa garlaa" });
  }
});

customersRouter.delete("/", async (request, response) => {
  const { id } = request.body;
  console.log(id);

  try {
    await sql`Delete from customers where customerid=${Number(id)}`;
    response.status(200).json({ message: "amjilttai ustgalaa" });
  } catch (error) {
    response.status(400).json({ message: "Delete hiih id oldsongui" });
  }
});

customersRouter.put("/", async (request, response) => {
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
