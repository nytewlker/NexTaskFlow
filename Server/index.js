const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');
const userRoutes = require("./routes/ur");
const projectRoutes = require("./routes/pr");


require("dotenv").config();



const contactRoutes = require('./routes/contactRoutes');
const dbConnect = require("./db/dbConnect");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/api', contactRoutes);
// app.use('/api', require('./routes/fetchRoute'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/projects', require('./routes/projectRoutes'));



app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);




dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});