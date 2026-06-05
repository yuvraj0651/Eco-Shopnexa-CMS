import express from "express";
import cors from "cors";

import contentRoutes from "./routes/content.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/content", contentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});