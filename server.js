import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';


// configure env
dotenv.config();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create Express app
const app = express();

// connect to database
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"./client/build")))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productsRoutes);

//rest api
app.use('*', function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.get('/', (req, res) => {
  res.send("Welcome to the ECOMMERCE APP");
});

// PORT
app.listen(process.env.PORT, () => {
  console.log("App is running!");
});
