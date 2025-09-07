import express from 'express';
import dotenv from 'dotenv';
// or we can write import "dotenv/config" directly
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path'

const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,//allow frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;


app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

//NODE_ENV is injected by node.js which tells whether application is in dev ,prod,or test mode
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')));
  app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
  });
}


app.listen(PORT, () => {
  console.log("Server running on port ",PORT);
  connectDB();
});