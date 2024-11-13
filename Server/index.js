const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();


const contactRoutes = require('./routes/contactRoutes');
const dbConnect = require("./db/dbConnect");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded());
app.use(express.json());

app.use('/api', contactRoutes);
app.use('/api/auth', require('./routes/auth'));

dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});