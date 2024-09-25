import express from "express";
import { customersRouter } from "../router/customers.router.js";
import { getPgVersion } from "../database/index.js";
import { ordersRouter } from "../router/orders.router.js";
import { productsRouter } from "../router/products.router.js";

const app = express();

app.use(express.json());

const port = 8000;

app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
