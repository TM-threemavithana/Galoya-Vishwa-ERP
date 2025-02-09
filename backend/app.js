import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import productRoutes from "./router/products.js";
import inventoryRoutes from "./router/inventoryRoutes.js";
import distributionRoutes from "./router/distributionRoutes.js";
import stockReductionRoutes from "./router/stockReductionRoutes.js";
import totalsRoutes from "./router/totalsRoutes.js";
import machineRepairRoutes from "./router/machineRepairRoutes.js";
import machineRoutes from "./router/machineRoutes.js";
import vehicleMaintenanceRoutes from "./router/vehicleMaintenanceRoutes.js";
import rawMaterialsLogRoutes from './router/rawMaterialsLogRoutes.js';
import shopDetailsRoutes from './router/shopDetailsRoutes.js';
import returnedItemsRoutes from './router/returnedItemsRoutes.js';


const app = express();
config({
  path: "./config/config.env",
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Register routes
app.use("/api/v1/user", userRouter);
app.use("/api/products", productRoutes);
app.use("/api/inventories", inventoryRoutes);
app.use("/api/distributions", distributionRoutes);
app.use("/api/stock-reductions", stockReductionRoutes);
app.use("/api/totals", totalsRoutes);
app.use("/api/machinerepairs", machineRepairRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/vehicle-maintenance", vehicleMaintenanceRoutes);
app.use('/api/raw-materials-log', rawMaterialsLogRoutes);
app.use('/api/shop-details', shopDetailsRoutes);
app.use('/api/returned-items', returnedItemsRoutes);


connection();
app.use(errorMiddleware);

export default app;
