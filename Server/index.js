const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
var bodyParser = require('body-parser');

require("dotenv").config();



const contactRoutes = require('./routes/contactRoutes');
const dbConnect = require("./db/dbConnect");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies


app.use('/api', contactRoutes);
app.use('/api', require('./routes/fetchRoute'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projectRoutes'));

dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});